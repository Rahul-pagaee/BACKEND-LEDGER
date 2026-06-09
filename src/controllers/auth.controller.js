const { JsonWebTokenError } = require("jsonwebtoken");
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const emailService = require("../services/email.service");
const tokenBlacklistModel = require("../model/blacklist.model");
/**
 * - user register controller
 * - Post /api/auth/register
 */

async function userRegisterController(req, res) {
  const { email, password, name } = req.body;
  const isExist = await userModel.findOne({
    email: email,
  });
  if (isExist) {
    return res.status(422).json({
      message: "User is already exist with email",
      status: "failed",
    });
  }
  const user = await userModel.create({
    email,
    password,
    name,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  res.cookie("token", token);

  await emailService.sendRegisterationEmail(user.email, user.name);

  return res.status(201).json({
    message: "User registered successfully",
    status: "success",
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    token,
  });
}

/**
 * - User Login Controller
 * - POST /api/auth/login
 */

async function userLoginController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      message: "Email or password is Invalid",
    });
  }

  const invalidPassowrd = await user.comparePassword(password);

  if (!invalidPassowrd) {
    return res.status(401).json({
      message: "Email or Password is Invalid",
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token);

  res.status(200).json({
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    token,
  });
}

async function userlogOutController(req, res) {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(200).json({
      message: "User logged out successfully",
    });
  }
  res.cookie("token", "");

  await tokenBlacklistModel.create({
    token: token,
  });

  res.status(200).json({
    message: "User logout successfully",
  });
}

module.exports = {
  userRegisterController,
  userLoginController,
  userlogOutController,
};
