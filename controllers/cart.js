const asyncHandler = require("express-async-handler");
const Cart = require("../models/cart");

const addToCart = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, images } = req.body;

  if (!name || !category || !images || !quantity || !price) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const product = await Cart.create({
    name,
    category,
    quantity,
    price,
    images,
  });

  res.status(201).json(product);
});

const deleteCartItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Cart.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await Cart.findByIdAndDelete(id);

  res.status(200).json("item removed");
});

const getCartProducts = asyncHandler(async (req, res) => {
  const products = await Cart.find().sort("-createdAt");

  res.status(200).json(products);
});

module.exports = { addToCart, deleteCartItem, getCartProducts };
