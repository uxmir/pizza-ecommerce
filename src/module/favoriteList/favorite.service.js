import ApiError from "../../common/utils/response.error.js";
import Favorite from "./favorite.model.js";

const createFovoriteList = async (userId, dataId) => {
  try {
    if (!userId || !dataId)
      throw ApiError.unauthorized("user or data is invalid");
    const createFavorite = await Favorite.create({
      user: userId,
      data: dataId,
    });
    return createFavorite;
  } catch (error) {
    throw ApiError.badRequest(`favolist is not created ${error?.message}`);
  }
};

const findFavoriteList = async (userId, requestQuery) => {
  try {
    if (!userId) throw ApiError.unauthorized("user  is invalid");
    const {
      search,
      title,
      description,
      category,
      page = 1,
      limit = 10,
    } = requestQuery;
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    const skip = (page - 1) * limit;
    const findData = await Favorite.find(query)
      .populate("user", "email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    const totalItem = await Favorite.countDocuments(query);
    return {
      allData: findData,
      totalItem,
      currentPage: parseInt(page),
      totalPages: Math.ceil(allData / limit),
    };
  } catch (error) {
    throw ApiError.badRequest(`favolist is not found ${error?.message}`);
  }
};
const findById=async(dataId)=>{
  try {
    if(!dataId) throw ApiError.notFound("data is nor found")
    const findId=await Favorite.findById(dataId)
    return findId
  } catch (error) {
    throw ApiError.badRequest(`favolist is not found ${error?.message}`);
  }
}
export { createFovoriteList,findFavoriteList,findById };
