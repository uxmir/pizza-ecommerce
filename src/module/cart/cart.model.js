import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  },
);
export default mongoose.model("Cart", cartSchema);
