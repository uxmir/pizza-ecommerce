import ApiError from "../../common/utils/response.error.js";
import Favorite from "./favorite.model.js";

const createFovoriteList = async (userId, dataId) => {
  try {
    if (!userId || !dataId)
      throw ApiError.unauthorized("user or data is invalid");
    const existing = await Favorite.findOne({ user: userId, pizza: dataId });
    if (existing) throw ApiError.conflict("data is already exist");
    const createFavorite = await Favorite.create({
      user: userId,
      pizza: dataId,
    });
    return createFavorite;
  } catch (error) {
    throw ApiError.badRequest(`favolist is not created ${error?.message}`);
  }
};

const findFavoriteList = async (userId, requestQuery) => {
  try {
    if (!userId) throw ApiError.unauthorized("user  is invalid");
    const { search, page = 1, limit = 5 } = requestQuery;
    const query = { user: userId };
    const skip = (page - 1) * limit;
    const findData = await Favorite.find(query)
      .populate("pizza")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    const totalItem = await Favorite.countDocuments(query);
    return {
      allData: findData,
      totalItem,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalItem / limit),
    };
  } catch (error) {
    throw ApiError.badRequest(`favolist is not found ${error?.message}`);
  }
};
const findById = async (dataId) => {
  try {
    if (!dataId) throw ApiError.notFound("data is not found");
    const findId = await Favorite.findById(dataId).populate("pizza");
    return findId;
  } catch (error) {
    throw ApiError.badRequest(`favolist is not found ${error?.message}`);
  }
};
const removeById = async (dataId) => {
  try {
    if (!dataId) throw ApiError.notFound("data is not found");
    const deletedata = await Favorite.findByIdAndDelete(dataId);
    return deletedata;
  } catch (error) {
    throw ApiError.badRequest(`data is not deleted ${error?.message}`);
  }
};

const removeAll = async (userId) => {
  try {
    if (!userId) throw ApiError.notFound("user is not found");
    const removeAll = await Favorite.deleteMany({user:userId});
    return removeAll;
  } catch (error) {
    throw ApiError.badRequest(`data is not deleted ${error?.message}`);
  }
};
export {
  createFovoriteList,
  findFavoriteList,
  findById,
  removeById,
  removeAll,
};
