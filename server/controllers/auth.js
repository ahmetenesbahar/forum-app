import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER */

export const register = async (req, res) => {
  try {
    const {
      userName,
      profileName,
      email,
      password,
      picturePath,
      location,
      bio,
      interestedCategories,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      userName,
      profileName,
      email,
      password: passwordHash,
      picturePath,
      location,
      bio,
      interestedCategories,
    });

    const savedUzer = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
