const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters");
  }

  //Validate email
  const checkEmail = await User.findOne({ email });

  if (checkEmail) {
    res.status(400);
    throw new Error("Email has already been register");
  }

  const user = await User.create({ name, email, password });

  // Generate token
  const token = generateToken(user._id);

  if (user) {
    const { _id, name, email, role } = user;

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "none",
      secure: true,
    });

    res.status(201).json({ _id, name, email, role, token });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  //Validate user
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User does not exist, Please sign up.");
  }

  //Validate password
  const checkPassword = await bcrypt.compare(password, user.password);

  //Generate token
  const token = generateToken(user._id);

  if (user && checkPassword) {
    const newUser = await User.findOne({ email }).select("-password");

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "none",
      secure: true,
    });

    res.status(201).json(newUser);
  } else {
    res.status(400);
    throw new Error("Invalid email or password.");
  }
});

//logout
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    //   sameSite: "none",
    //   secure: true,
  });

  res.status(200).json("Successfully Logged Out");
});

//get user
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//login status
const getLoginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json(false);
  }

  //Verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (verified) {
    res.json(true);
  } else {
    res.json(false);
  }
});

//update user
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    const { name, phone, address } = user;

    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.address = req.body.address || address;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//update photo
const updatePhoto = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  const { photo } = req.body;

  if (user) {
    user.photo = photo;
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUser,
  getLoginStatus,
  updateUser,
  updatePhoto,
};
