const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
  const { id } = req.params;
  const { name, category, quantity, price, images } = req.body;

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

  user.cart.push(product);
  await user.save();

  res.status(201).json(user);
});

const deleteCartItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const cart = user.cart;

  // const product = await Cart.findById(id);

  // if (!product) {
  //   res.status(404);
  //   throw new Error("Product not found");
  // }

  // await Cart.findByIdAndDelete(id);

  res.status(200).json({ cart, cartID: id });

  // state.cart = state.cart.filter((product) => product._id !== action.payload);
});

const getCartProducts = asyncHandler(async (req, res) => {
  const user = req.user;
  const cart = user.cart;
  res.status(200).json({ cart });
});

const checkout = asyncHandler(async (req, res) => {
  const { products } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
        images: [product.image],
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/payment-success`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel-payment`,
  });

  res.json({ id: session.id });
});

module.exports = { addToCart, deleteCartItem, getCartProducts, checkout };
