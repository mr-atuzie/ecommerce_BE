const asyncHandler = require("express-async-handler");
const Order = require("../models/order");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// function Str_Random(length) {
//   let result = "";
//   const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

//   // Loop to generate characters for the specified length
//   for (let i = 0; i < length; i++) {
//     const randomInd = Math.floor(Math.random() * characters.length);
//     result += characters.charAt(randomInd);
//   }
//   return result;
// }

const addToCart = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    quantity,
    size,
    description,
    category,
    image,
    productId,
  } = req.body;

  const product = {
    productId,
    name,
    price,
    quantity,
    size,
    description,
    category,
    image,
  };

  const user = req.user;

  user.cart.push(product);
  // user.cart = [];

  const updatedUser = await user.save();

  res.status(201).json({
    cart: updatedUser.cart,
  });
});

const removeFromCart = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const user = req.user;

  const newCart = user.cart.filter((item) => item.productId !== id);
  user.cart = newCart;
  // user.cart = [];

  const updatedUser = await user.save();

  res.status(201).json(updatedUser.cart);
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
    cancel_url: `${process.env.FRONTEND_URL}/cart`,
  });

  res.json({ id: session.id });
});

const orderProduct = asyncHandler(async (req, res) => {
  const { shipping, products } = req.body;

  const user = req.user;

  const orderDoc = await Order.create({
    user: user._id,
    products,
    delivery: shipping,
  });

  res.status(201).json(orderDoc);
});

const getOrder = asyncHandler(async (req, res) => {
  const user = req.user;

  const orderDoc = await Order.find({
    user: user._id,
  });

  res.status(201).json(orderDoc);
});

module.exports = {
  checkout,
  orderProduct,
  getOrder,
  addToCart,
  removeFromCart,
};
