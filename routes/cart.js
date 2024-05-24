const express = require("express");
const {
  addToCart,
  deleteCartItem,
  getCartProducts,
} = require("../controllers/cart");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.patch("/", protect, addToCart);
router.delete("/:id", deleteCartItem);
router.get("/", getCartProducts);

module.exports = router;
