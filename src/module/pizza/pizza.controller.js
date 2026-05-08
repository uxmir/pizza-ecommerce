import * as PizzaService from "./pizza.service.js";
import ApiResponse from "../../common/utils/response.success.js";
const createdPizza = async (req, res) => {
  const pizza = await PizzaService.createPizza(req.user?._id, req.body);
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
export { createdPizza, findAll };
