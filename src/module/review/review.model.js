import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema({
       user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true, "user is required"],
        },
        pizza: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pizza",
          required: [true, "Pizza data is required"],
        },
        constent:{
          type:String,
          required: [true, "Content data is required"], 
        },
        rating:{
          type:Number,
         required: [true, "Rating data is required"], 
        }
},{
    timestamps:true
})

export default mongoose.model("Review",reviewSchema)