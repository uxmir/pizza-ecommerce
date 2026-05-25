import * as CheckoutService from './checkout.service.js'
import ApiResponse from '../../common/utils/response.success.js'

const checkout = async (req, res) => {
    const result = await CheckoutService.initialPayment(req.user?._id, req.body);
    ApiResponse.created(res, "checkout is created", result);
}

const successPayment = async (req, res) => {
    await CheckoutService.successPayment(req.params.transId);
    res.redirect("http://localhost:3000/order/success");
}

const failPayment = async (req, res) => {
   res.redirect("http://localhost:3000/order/fail");
}

export {
    checkout,
    successPayment,
    failPayment
}