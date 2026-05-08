import ApiError from "../../common/utils/response.error.js";
import Pizza from "./pizza.model.js";

const createPizza = async (userId, { title, description, category, price }) => {
  try {
    if (!title || !description || !category || !price)
      throw ApiError.notFound("each feild in pizza is required");
    const createPizza = await Pizza.create({
      user: userId,
      title,
      description,
      category,
      price: parseInt(price),
      isBestSeller,
    });
    return createPizza;
  } catch (error) {
    throw ApiError.badRequest(`pizza is not created ${error?.message}`);
  }
};

const findAll = async (requestQuery) => {
  const { search, page = 1, limit = 10 } = requestQuery;
  const query = {};
  if (search) {
    query.$or[
      ({ $regex: title, $options: "i" },
      { $regex: description, $options: "i" },
      { $regex: category, $options: "i" })
    ];
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
};

export { createPizza,findAll };
