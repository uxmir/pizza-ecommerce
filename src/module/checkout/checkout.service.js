import checkout from "./checkout.model.js";
import Cart from "../cart/cart.model.js";
import User from "../auth/auth.model.js";
import ApiError from "../../common/utils/response.error.js";
import SSLCommerzPayment from "sslcommerz-lts";

const store_id = process.env.STORE_ID || "testbox";
const store_password = process.env.STORE_PASSWORD || "testbox";
const is_live = process.env.IS_LIVE === "true"; 

const initialPayment = async (userId, data) => {
  try {
    const { phone, address } = data;
    const cartItems = await Cart.find({ user: userId }).populate("pizza");
    if (!cartItems || cartItems?.length === 0)
      throw ApiError.notFound("cart is empty");

    let totalAmount = 0;
    const orderItems = cartItems?.map((item) => {
      totalAmount += item?.price; 
      return {
        pizza: item?.pizza?._id,  
        title: item?.pizza?.title, 
        price: Math.round(item?.price / item?.quantity), 
        quantity: item?.quantity,
      };
    });

    const transactionId = `TXN${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const order = await checkout.create({
      user: userId,
      items: orderItems,
      totalAmount: totalAmount,
      transactionId: transactionId,
      phone,
      address,
    });
    const userData = await User.findById(userId);

    const sslData = {
      total_amount: totalAmount,
      currency: "BDT",
      tran_id: transactionId,
      success_url: `${process.env.BASE_URL}/api/v1/orders/checkout/success/${transactionId}`,
      fail_url: `${process.env.BASE_URL}/api/v1/orders/checkout/fail/${transactionId}`,
      cancel_url: `${process.env.BASE_URL}/api/v1/orders/checkout/cancel/${transactionId}`,
      ipn_url: `${process.env.BASE_URL}/api/v1/orders/payment/ipn`,
      shipping_method: "Courier",
      product_name: "Pizza",
      product_category: "Food",
      product_profile: "general",
      cus_name: userData?.name || "Customer",
      cus_email: userData?.email || "customer@gmail.com",
      cus_add1: address,
      cus_phone: phone,
      ship_name: userData?.name || "Customer",
      ship_add1: address,
    };

    const sslCommerze = new SSLCommerzPayment(store_id, store_password, is_live);
    const apiResponse = await sslCommerze.init(sslData);

    if (apiResponse?.gatewayPageURL) {
      return { paymentURL: apiResponse.gatewayPageURL, transactionId };
    } else {
      throw ApiError.notFound("payment system is failed");
    }
  } catch (error) {
    throw ApiError.badRequest(`Error is ${error?.message}`);
  }
};

const successPayment = async (transId) => {
  try {
    const order = await checkout.findOne({ transactionId: transId });
    if (!order) throw ApiError.notFound("Order transaction id is not found");
    
    if (order?.status === "Pending") {
      order.status = "Paid";
      await order.save();
      await Cart.deleteMany({ user: order.user });
    }
    return order;
  } catch (error) {
    throw ApiError.badRequest(`Error is ${error?.message}`);
  }
};

export { initialPayment, successPayment };