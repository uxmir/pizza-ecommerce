import ApiResponse from '../../common/utils/response.success.js'
import * as CartService from './cart.service.js'
const createCart=async(req,res)=>{
const {cart,totalData}=await CartService.createCart(req.user?._id , req.body , req.file)
ApiResponse.created(res,"cart is added",{cart,totalData})
}
const findAllCart=async(req,res)=>{
   const {getCartAll,totalCart}= await CartService.findAllCart()
    ApiResponse.ok(res,"cart data is fetched",{getCartAll,totalCart})
}
const deleteCart=async(req,res)=>{
    await CartService.deleteCart(req.params.id)
ApiResponse.ok(res,"cart is deleted")
}
export{
    createCart,
    findAllCart,
    deleteCart
}