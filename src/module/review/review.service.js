import ApiError from "../../common/utils/response.error";
import Review from "./review.model.js";

const createReview = async (userId, pizzaId, content, rating) => {
  try {
    if (!userId || !pizzaId || !content || !rating)
      throw ApiError.notFound("user or data or content or rating is missing");
    const createreview = await Review.create({
      user: userId,
      pizza: pizzaId,
      content,
      rating: parseFloat(rating),
    });
    return createReview;
  } catch (error) {
    throw ApiError.badRequest(`Error is ${error?.message}`);
  }
};

const findAll = async (pizzaId) => {
  try {
    if (!pizzaId) throw ApiError.unauthorized("user is invalid");
    const findAll = await Review.find({ pizza: pizzaId });
    return findAll;
  } catch (error) {
    throw ApiError.badRequest(`Error is ${error?.message}`);
  }
};
const findForUser = async (userId) => {
  try {
    if (!userId) throw ApiError.notFound("user   is missing");
    const findForUser = await Review.find({ user: userId });
    return findForUser;
  } catch (error) {
    throw ApiError.badRequest(`Error is ${error?.message}`);
  }
};

const updateReview = async (pizzaId, data) => {
  try {
    if (!pizzaId || !data) throw ApiError.notFound("pizza or data is missing");
    const updateData = await Review.findByIdAndUpdate(
      { pizza: pizzaId },
      data,
      { returnDocument: "after", runValidators: true },
    );
    return updateData;
  } catch (error) {
    throw ApiError.badRequest(`Error is ${error?.message}`);
  }
};

const deleteById = async (pizzaId) => {
  try {
    if (!pizzaId) throw ApiError.notFound("pizza data is missing");
    const deleteId = await Review.findByIdAndDelete(pizzaId);
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
export { createReview, findAll, findForUser, updateReview, deleteById,deleteAll };
