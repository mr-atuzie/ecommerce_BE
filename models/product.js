const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add product name"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add category"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Please add brand"],
      trim: true,
    },
    color: {
      type: String,
      required: [true, "Please add color"],
      trim: true,
      default: "As seen",
    },
    quantity: {
      type: Number,
      required: [true, "Please add quantity"],
      trim: true,
    },
    sold: {
      type: Number,
      default: 0,
      trim: true,
    },
    regularPrice: { type: Number, trim: true },
    price: {
      type: Number,
      required: [true, "Please add product price"],
      trim: true,
    },
    desc: {
      type: String,
      required: [true, "Please add description"],
      trim: true,
    },
    image: {
      type: [String],
    },
    ratings: {
      type: [Object],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
