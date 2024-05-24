const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

function Str_Random(length) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

  // Loop to generate characters for the specified length
  for (let i = 0; i < length; i++) {
    const randomInd = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomInd);
  }
  return result;
}

const addToCart = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, images } = req.body;

  const user = req.user;

  if (!name || !category || !images || !quantity || !price) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const product = {
    id: Str_Random(12),
    name,
    category,
    quantity,
    price,
    images,
  };

  const userDoc = await User.findById(user._id);

  userDoc.cart.push(product);
  await userDoc.save();

  res.status(201).json(userDoc);
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
  const token = req.cookies.token;

  if (token) {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      res.send([]);
      throw new Error("Token has expired, please login");
    }

    const userDoc = await User.findById(verified.id);
    const { cart } = userDoc;
    res.status(200).json(cart);
  }
});

module.exports = { addToCart, deleteCartItem, getCartProducts };
