import checkout from "./checkout.model.js";
import Cart from "../cart/cart.model.js";
import User from "../auth/auth.model.js";
import ApiError from "../../common/utils/response.error.js";
import SSLCommerzPayment from "sslcommerz-lts";
const store_id = process.env.STORE_ID || "testbox";
const store_password = process.env.STORE_PASSWORD || "testbox";
const is_live = process.env.IS_LIVE === true;

const initialPayment = async (userId, data) => {
  try {
    const { phone, address } = data;
    const cartItems = await Cart.find({ user: userId }).populate("pizza");
    if (!cartItems || cartItems?.length === 0)
      throw ApiError.notFound("cart is empty");
    let totalAmount = 0;
    const orderItems = cartItems?.map((item) => {
      totalAmount = item?.price;
      return {
        pizza: item?._id,
        title: item?.title,
        price: item?.price / item?.quantity,
        quantity: item?.quantity,
      };
    });
    const transactionId = `TXN${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const order = await checkout.create({
      user: userId,
      items: orderItems,
      transactionId: transactionId,
      phone,
      address,
    });

    const user = await User.findOne({ user: userId }).populate("name", "email");
    const sslData = {
      total_amount: totalAmount,
      currency: "BDT",
      tran_id: transactionId,
      success_url: `${process.env.BASE_URL}/api/v1/orders/payment/success/${transactionId}`,
      fail_url: `${process.env.BASE_URL}/api/v1/orders/payment/fail/${transactionId}`,
      cancel_url: `${process.env.BASE_URL}/api/v1/orders/payment/cancel/${transactionId}`,
      ipn_url: `${process.env.BASE_URL}/api/v1/orders/payment/ipn`,
      shipping_method: "Courier",
      product_name: "Pizza",
      product_category: "Food",
      product_profile: "general",
      cus_name: `${user?.name}`,
      cus_email: `${user?.email}`,
      cus_add1: address,
      cus_phone: phone,
      ship_name: `${user?.name}`,
      ship_add1: address,
    };

    const sslCommerze = new SSLCommerzPayment(
      store_id,
      store_password,
      is_live,
    );
    const apiResponse = await sslCommerze.init(sslData);
    if (apiResponse?.gatewayPageURL) {
      return { paymentURL: gatewayPageURL, transactionId };
    } else {
      throw ApiError.notFound("payment system is failed");
    }
  } catch (error) {
    throw ApiError.badRequest(`Error is ${error?.message}`);
  }
};

export {
initialPayment,
}