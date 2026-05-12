import ApiError from "../../common/utils/response.error.js";
import uploadToImagekit from "../../common/utils/upload.imagekit.js";
import Pizza from "./pizza.model.js";

const createPizza = async (userId, data, file) => {
  try {
    const { title, description, category, price, isBestSeller } = data;
    if (!title || !description || !category || !price)
      throw ApiError.notFound("each feild in pizza is required");
    //file system
    let imageUrl = "";
    if (file) {
      const response = await uploadToImagekit(file.path,file.filename);
      imageUrl = response.url;
    }
    const createPizza = await Pizza.create({
      user: userId,
      title,
      description,
      image: imageUrl,
      category,
      price: parseInt(price),
      isBestSeller,
      discount
    });
    return createPizza;
  } catch (error) {
    throw ApiError.badRequest(`pizza is not created ${error?.message}`);
  }
};

const findAll = async (requestQuery) => {
  try {
    const { search, category, page = 1, limit = 10 } = requestQuery;
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }
    if (category) {
      query.category = category;
    }
    const skip = (page - 1) * limit;
    const allData = await Pizza.find(query)
      .populate("user", "email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    const totalData = await Pizza.countDocuments(query);
    return {
      allData,
      totalData,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalData / limit),
    };
  } catch (error) {
    throw ApiError.badRequest(`PizzaData is not found ${error?.message}`);
  }
};
const findById = async (dataId) => {
  try {
    const findOne = await Pizza.findById(dataId).populate("user", "email");
    return findOne;
  } catch (error) {
    throw ApiError.badRequest(`PizzaData is not found ${error?.message}`);
  }
};

const updateById = async (dataId, data, file) => {
  try {
    //file system
    let imageUrl =data?.image;
    if (file) {
    const response = await uploadToImagekit(file.path,file.filename);;
      imageUrl = response.url;
    }
    const updateData = await Pizza.findByIdAndUpdate(
      dataId,
      { ...data, image: imageUrl },
      { returnDocument: "after", runValidators: true },
    );
    return updateData;
  } catch (error) {
    throw ApiError.badRequest(`PizzaData is not edited ${error?.message}`);
  }
};
const deleteById = async (dataId) => {
  try {
    const deleteData = await Pizza.findByIdAndDelete(dataId);
    return deleteData;
  } catch (error) {
    throw ApiError.badRequest(`PizzaData is not edited ${error?.message}`);
  }
};
export { createPizza, findAll, findById, updateById, deleteById };
