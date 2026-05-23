import ApiError from "../../common/utils/response.error.js";
import Review from "./review.model.js";

const createReview = async (userId, pizzaId,data) => {
  try {
    const {content,rating}=data
    if (!userId || !pizzaId || !content || !rating)
      throw ApiError.notFound("user or data or content or rating is missing");
    const createreview = await Review.create({
      user: userId,
      pizza: pizzaId,
      content,
      rating: parseFloat(rating),
    });
    return createreview;
  } catch (error) {
    throw ApiError.badRequest(`Error is ${error?.message}`);
  }
};

const findAll = async (pizzaId) => {
  try {
    if (!pizzaId) throw ApiError.unauthorized("Data is invalid");
    const findAll = await Review.find({ pizza: pizzaId }).populate("user","email");
    return findAll;
  } catch (error) {
    throw ApiError.badRequest(`Error is ${error?.message}`);
  }
};
const findForUser = async (userId) => {
  try {
    if (!userId) throw ApiError.notFound("user   is missing");
    const findForUser = await Review.find({ user: userId }).populate("pizza");
    return findForUser;
  } catch (error) {
    throw ApiError.badRequest(`Error is ${error?.message}`);
  }
};

const updateReview = async (reviewId,userId,data) => {
  try {
    if (!reviewId || !userId || !data) throw ApiError.notFound("pizza or data is missing");
    const updateData = await Review.findOneAndUpdate(
      { _id: reviewId,user:userId },
      {content:data?.content,rating:data?.rating},
      { new:true, runValidators: true },
    );
    return updateData;
  } catch (error) {
    throw ApiError.badRequest(`Error is ${error?.message}`);
  }
};

const deleteById = async (reviewId,userId) => {
  try {
    if (!reviewId || !userId) throw ApiError.notFound("pizza data is missing");
    const deleteId = await Review.findOneAndDelete({_id:reviewId,user:userId});
    return deleteId;
  } catch (error) {
    throw ApiError.badRequest(`Error is ${error?.message}`);
  }
};

const deleteAll = async (userId) => {
  try {
    if (!userId) throw ApiError.unauthorized("user is invalid");
    const deleteAll = await Review.deleteMany({ user: userId });
    return deleteAll;
  } catch (error) {
    throw ApiError.badRequest(`Error is ${error?.message}`);
  }
};
export {
  createReview,
  findAll,
  findForUser,
  updateReview,
  deleteById,
  deleteAll,
};
