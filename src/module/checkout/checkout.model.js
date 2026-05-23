import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user data is required"],
    },
    items: [
      {
        pizza: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pizza",
          required: [true, "pizza is required"],
        },
        title: String,
        price: Number,
        quantity:Number,
      },
    ],
    totalAmount: {
      type: Number,
      required: [true, "Cart amount is required"],
    },
      status: {
        type: String,
        enum: ["Pending", "Paid", "Failed", "Cancelled"],
        default: "Pending",
      },
    transactionId: {
      type: String,
      required: [true, "transactionId is required"],
      unique: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Checkout", checkoutSchema);
