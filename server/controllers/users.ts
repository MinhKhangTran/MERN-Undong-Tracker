// global imports
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
// import model
import User from "../models/User";

// import generatetoken
import { generateToken } from "../utils/generateToken";

// @desc    Register
// @route   POST api/a1/users/register
// @access  public
export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });
  if (user) {
    res.status(400);
    throw new Error("Dieser Benutzer ist schon angemeldet");
  }
  const newUser = await User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });
  if (newUser) {
    res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Es gab ein Fehler beim Registrieren");
  }
});
// @desc    Login
// @route   POST api/a1/users/login
// @access  public
export const login = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    res.status(400);
    throw new Error("Dieser Benutzer ist noch nicht angemeldet");
  }
  const isMatch = await user.comparePassword(req.body.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Falsches Passwort");
  }
  if (user && isMatch) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Es gab ein Fehler beim Einloggen");
  }
});
// @desc    get Logged in User
// @route   GET api/a1/users/me
// @access  private
export const getLoggedUser = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(req.user);
    const user = await User.findById(req.user?.id).select("-password");

    if (!user) {
      res.status(400);
      throw new Error("Das ist nicht dein Account!");
    }
    if (user) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    }
  }
);
