const asyncHandler = require("express-async-handler");
const sendEmail = require("../utils/sendEmail");

const sendMessage = asyncHandler(async (req, res) => {
  const { name, email, code } = req.body;
  const message = `
    <h2 >Hi ${name}</h2>

    <h4 style="color: green;">Welcome to Honeycombfxd Farm</h4>
    <p style="font-size: 13px;">Empower your financial future with Honeycombfxd farm,Invest confidently, stay informed, and take control of your wealth, all in one place.</p>
   
    <p>Your email verification code is</p>
    <h1 style="color: green;"> ${code}</h1>

    <h5 style="color: gold;">Honey comb fxd farm</h5>
    `;
  const subject = "Verify your Email";
  const send_to = email;
  const send_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, send_from);
    res.status(201).json("Email has been sent");
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent , Please try Again.");
  }
});

module.exports = { sendMessage };
