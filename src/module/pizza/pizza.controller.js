import * as PizzaService from "./pizza.service.js";
import ApiResponse from "../../common/utils/response.success.js";
const createdPizza = async (req, res) => {
  const pizza = await PizzaService.createPizza(req.user?._id, req.body,req.file);
  ApiResponse.ok(res, "pizza is created", pizza);
};
const findAll = async (req, res) => {
  const { allData, totalData, currentPage, totalPages } =
    await PizzaService.findAll(req.query);
  ApiResponse.ok(res, "pizza is created", {
    allData,
    totalData,
    currentPage,
    totalPages,
  });
};
const findById = async (req, res) => {
  const data = await PizzaService.findById(req.params.id);
  ApiResponse.ok(res, "data is found", data);
};
const updateById = async (req, res) => {
  const data = await PizzaService.updateById(req.params.id, req.body,req.file);
  ApiResponse.ok(res, "data is updated", data);
};
const deleteById = async (req, res) => {
  await PizzaService.deleteById(req.params.id);
  ApiResponse.ok(res, "data is deleted successfully");
};
export { createdPizza, findAll, findById, updateById, deleteById };
