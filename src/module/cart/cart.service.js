import ApiError from "../../common/utils/response.error.js";
import uploadToImagekit from "../../common/utils/upload.imagekit.js";
import Pizza from "../pizza/pizza.model.js";
import Cart from "./cart.model.js";

const createCart = async (userId, dataId) => {
  try {
    const pizzaDetails = await Pizza.findById(dataId);
    const originalPrice = pizzaDetails?.price;
    const discount = pizzaDetails?.discount || 0;
    const discountPrice =
      discount > 0
        ? originalPrice - (discount / 100) * originalPrice
        : originalPrice;
    const pizza = await Cart.findOne({ user: userId, pizza: dataId });
    if (pizza) throw ApiError.conflict("data is created");
    const createdData = await Cart.create({
      user: userId,
      pizza: dataId,
      price: Math.round(discountPrice), 
    });
    return createdData;
  } catch (error) {
    throw ApiError.badRequest(`cart is not created ${error?.message}`);
  }
};
const increaseCart = async (userId, dataId) => {
  try {
    const pizzaDetails = await Pizza.findById(dataId);
    const originalPrice = pizzaDetails?.price;
    const discount = pizzaDetails?.discount || 0;
    const discountPrice =
      discount > 0
        ? originalPrice - (discount / 100) * originalPrice
        : originalPrice;
    const cartItem = await Cart.findOne({ user: userId, pizza: dataId });
    if (cartItem) {
      cartItem.quantity += 1;
      cartItem.price = Math.round(discountPrice * cartItem?.quantity);
      return await cartItem.save();
    } else {
      return await Cart.create({
        user: userId,
        pizza: dataId,
        quantity: 1,
        price: Math.round(discountPrice),
      });
    }
  } catch (error) {
    throw ApiError.badRequest(`cart is not increased ${error?.message}`);
  }
};
const descreaseCart = async (userId, dataId) => {
  try {
    const pizzaDetails = await Pizza.findById(dataId);
    const originalPrice = pizzaDetails?.price;
    const discount = pizzaDetails?.discount || 0;
    const discountPrice =
      discount > 0
        ? originalPrice - (discount / 100) * originalPrice
        : originalPrice;
    const cartItem = await Cart.findOne({ user: userId, pizza: dataId });
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      cartItem.price = Math.round(discountPrice * cartItem?.quantity);
      return await cartItem.save();
    } else {
      await Cart.findOneAndDelete({ user: userId, pizza: dataId });
    }
  } catch (error) {
    throw ApiError.badRequest(`cart is not descreased ${error?.message}`);
  }
};
//getAll
const findAllCart = async (userId) => {
  try {
    const getCartAll = await Cart.find({ user: userId })
      .populate("user", "email")
      .populate("pizza")
      .sort({ createdAt: -1 });
    return {
      getCartAll,
      totalCart: getCartAll?.length,
    };
  } catch (error) {
    throw ApiError.badRequest(`cart is not found ${error?.message}`);
  }
};
//delete cart
const deleteCart = async (dataId) => {
  try {
    if (!dataId) throw ApiError.notFound("user or data is not found");
    const deleteCart = await Cart.findByIdAndDelete(dataId);
    return deleteCart;
  } catch (error) {
    throw ApiError.badRequest(`cart is not deleted ${error?.message}`);
  }
};

export { createCart, increaseCart, descreaseCart, deleteCart, findAllCart };
