const express = require("express");
const { sendMessage } = require("../controllers/auth");
const router = express.Router();

router.post("/send-email", sendMessage);

module.exports = router;
