import ApiResponse from "../../common/utils/response.success.js";
import * as CartService from "./cart.service.js";

const createCart = async (req, res) => {
  const data = await CartService.createCart(req.user?._id, req.params.id);
  ApiResponse.created(res, "car is created", data);
};
const increaseCart = async (req, res) => {
  await CartService.increaseCart(req.user?._id, req.params.id);
  ApiResponse.created(res, "cart is added");
};
const descreaseCart = async (req, res) => {
  await CartService.descreaseCart(req.user?._id, req.params.id);
  ApiResponse.created(res, "cart is added");
};
const findAllCart = async (req, res) => {
  const { getCartAll, totalCart } = await CartService.findAllCart(
    req.user?._id,
  );
  ApiResponse.ok(res, "cart data is fetched", { getCartAll, totalCart });
};
const deleteCart = async (req, res) => {
  await CartService.deleteCart(req.params.id);
  ApiResponse.ok(res, "cart is deleted");
};
export { createCart, increaseCart, descreaseCart, findAllCart, deleteCart };
