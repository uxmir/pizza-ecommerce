import * as favoriteService from "./favorite.service.js";
import ApiResponse from "../../common/utils/response.success.js";
const favorite = async (req, res) => {
  const data = await favoriteService.createFovoriteList(
    req.user?._id,
    req.params.id,
  );
  ApiResponse.created(res, "favorite is created", data);
};

const findAll = async (req, res) => {
  const { allData, totalItem, currentPage, totalPages } =
    await favoriteService.findFavoriteList(req.user?._id, req.query);
  ApiResponse.ok(res, "data is found", {
    allData,
    totalItem,
    currentPage,
    totalPages,
  });
};

const findById = async (req, res) => {
  const data = await favoriteService.findById(req.params.id);
  ApiResponse.ok(res, "data fetched", data);
};
const removeById = async (req, res) => {
  await favoriteService.removeById(req.params.id);
  ApiResponse.ok(res, "data is deleted");
};
const removeAll = async (req, res) => {
  await favoriteService.removeAll(req.user?._id);
  ApiResponse.ok(res, "data is deleted");
};
export { favorite, findAll, findById, removeById, removeAll };
