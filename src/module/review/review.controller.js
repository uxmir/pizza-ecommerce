import * as ReviewService from "./review.service.js";
import ApiResponse from "../../common/utils/response.success.js";
const createReview = async (req, res) => {
  const data = await ReviewService.createReview(
    req.user?._id,
    req.params.id,
    req.body
  );
  ApiResponse.created(res, "review is created", data);
};

const findReview = async (req, res) => {
  const data = await ReviewService.findAll(req.params.id);
  ApiResponse.created(res, "review is created", data);
};

const findForUser = async (req, res) => {
  const data = await ReviewService.findForUser(req.user?._id);
  ApiResponse.created(res, "review is found", data);
};
const updateReview = async (req, res) => {
  const data = await ReviewService.updateReview(req.params.id,req.user?._id, req.body);
  ApiResponse.created(res, "review is updated", data);
};
const deleteById = async (req, res) => {
  await ReviewService.deleteById(req.params.id,req.user?._id);
  ApiResponse.created(res, "review is deleted");
};
const deleteAll = async (req, res) => {
  await ReviewService.deleteAll(req.user?._id);
  ApiResponse.created(res, "allReview is created");
};
export {
  createReview,
  findReview,
  findForUser,
  updateReview,
  deleteById,
  deleteAll,
};
