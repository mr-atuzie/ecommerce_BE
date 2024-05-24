const express = require("express");
const {
  addToCart,
  deleteCartItem,
  getCartProducts,
} = require("../controllers/cart");
const router = express.Router();

router.post("/", addToCart);
router.delete("/:id", deleteCartItem);
router.get("/", getCartProducts);

module.exports = router;
