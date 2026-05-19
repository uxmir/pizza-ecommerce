import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
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
    content: {
      type: String,
      required: [true, "Content data is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating data is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Review", reviewSchema);
