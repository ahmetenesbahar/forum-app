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
      interestedCommunities,
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
      interestedCommunities,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//LOGGING IN

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
