import mongoose from "mongoose";
const pizzaSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user is required"],
  },
  title: {
    type: String,
    required: [true, "Tile is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
    image: {
    type: String,
    required: [true, "Image is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    index:true
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  discount:{
  type:Number,
  default:0
  },
  isBestSeller: {
    type: Boolean,
    required: [true, "BestSeller is required"],
    default:false,
    index:true
  },
},{
  timestamps:true
});

pizzaSchema.index({title:"text",description:"text",category:"text"})
export default mongoose.model("Pizza",pizzaSchema)