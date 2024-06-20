const express = require("express");
const {
  checkout,
  orderProduct,
  getOrder,
  addToCart,
  removeFromCart,
} = require("../controllers/cart");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/checkout-session", checkout);
router.patch("/addToCart", protect, addToCart);
router.patch("/remove", protect, removeFromCart);
router.post("/order", protect, orderProduct);
router.get("/order", protect, getOrder);

module.exports = router;
