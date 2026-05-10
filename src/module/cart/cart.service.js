import ApiError from "../../common/utils/response.error.js";
import uploadToImagekit from "../../common/utils/upload.imagekit.js";
import Cart from "./cart.model.js";

const createCart = async (userId, allData, file) => {
  try {
    if (!user || !allData || !file)
      throw ApiError.notFound("USer or pizzadata or image is missing");
    let imageUrl = data?.image;
    if (file) {
      const response = await uploadToImagekit(file.path, file.filename);
      imageUrl = response.url;
    }
    const addedData = [...allData, imageUrl];
    const cart = await Cart.create({
      user: userId,
      data:
        addedData?.length > 1 ? [...addedData, new Set(addedData)] : addedData,
    })
    const totalData = await Cart.countDocuments(cart);
    return {
      cart,
      totalData,
    };
  } catch (error) {
    throw ApiError.badRequest(`cart is not added ${error?.message}`);
  }
};
//getAll
const findAllCart = async () => {
  try {
    const getCartAll = await Cart.find().populate("user", "email").sort({ createdAt: -1 });
    return {
      getCartAll,
      totalCart: getCartAll?.length,
    };
  } catch (error) {
    throw ApiError.badRequest(`cart is not added ${error?.message}`);
  }
};
//delete cart
const deleteCart = async (dataId) => {
  try {
    if (!dataId) throw ApiError.notFound("user or data is not found");
    const deleteCart = await Cart.findOneAndDelete(dataId);
    return deleteCart;
  } catch (error) {
    throw ApiError.badRequest(`cart is not added ${error?.message}`);
  }
};

export { createCart, deleteCart,findAllCart };
