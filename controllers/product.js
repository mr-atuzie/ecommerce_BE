const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
const mongoose = require("mongoose");

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    sku,
    category,
    brand,
    quantity,
    price,
    desc,
    image,
    regularPrice,
    color,
  } = req.body;

  if (!name || !category || !brand || !quantity || !price) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const product = await Product.create({
    name,
    sku,
    category,
    brand,
    quantity,
    price,
    desc,
    image,
    regularPrice,
    color,
  });

  res.status(201).json(product);
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort("-createdAt");

  res.status(200).json(products);
});

const getProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await Product.findByIdAndDelete(productId);

  res.status(200).json("Product  deleted");
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    brand,
    quantity,
    price,
    desc,
    image,
    regularPrice,
    color,
  } = req.body;

  const productId = req.params.id;

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: productId },
    {
      name,
      category,
      brand,
      quantity,
      price,
      desc,
      image,
      regularPrice,
      color,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedProduct);
});

const reviewProduct = asyncHandler(async (req, res) => {
  const { rating, review, reviewDate } = req.body;

  const productId = req.params.id;

  if (rating < 1 || !review) {
    res.status(400);
    throw new Error("Please add rating and review");
  }

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.ratings.push({
    rating,
    review,
    reviewDate,
    name: req.user.name,
    userID: req.user._id,
  });

  product.save();

  res.status(200).json("Product review addded");
});

const deleteReview = asyncHandler(async (req, res) => {
  const { userID } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const newRating = product.ratings.filter((rating) => {
    return rating.userID.toString() !== userID.toString();
  });

  product.ratings = newRating;
  product.save();

  res.status(200).json("review removed");
});

const updateReview = asyncHandler(async (req, res) => {
  const { rating, review, reviewDate, userID } = req.body;

  const productId = req.params.id;

  if (rating < 1 || !review) {
    res.status(400);
    throw new Error("Please add rating and review");
  }

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (req.user._id.toString() !== userID) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedReview = await Product.findOneAndUpdate(
    {
      _id: product._id,
      "ratings.userID": mongoose.Types.ObjectId(userID),
    },
    {
      $set: {
        "ratings.$.rating": rating,
        "ratings.$.review": review,
        "ratings.$.reviewDate": reviewDate,
      },
    }
  );

  if (updatedReview) {
    res.status(200).json("review has been updated");
  } else {
    res.status(400);
    throw new Error("unable to update review");
  }
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteReview,
  updateReview,
};
