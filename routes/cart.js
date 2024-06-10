const express = require("express");
const {
  addToCart,
  deleteCartItem,
  getCartProducts,
  checkout,
} = require("../controllers/cart");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.patch("/", protect, addToCart);
router.delete("/:id", protect, deleteCartItem);
router.get("/", getCartProducts);

router.post("/checkout-session", checkout);

module.exports = router;
