const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add product name"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add category"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please add quantity"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please add product price"],
      trim: true,
    },
    images: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
