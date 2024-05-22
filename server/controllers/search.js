import Community from "../models/Community.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

/* READ */

export const searchAll = async (req, res) => {
  try {
    const { searchParameter } = req.query;
    const stringParameter = String(searchParameter);
    const regex = new RegExp(stringParameter, "i");

    const users = await User.find({
      profileName: { $regex: regex },
    });
    const communities = await Community.find({
      communityName: { $regex: regex },
    });
    const posts = await Post.find({ title: { $regex: regex } })
      .populate("author")
      .populate("community");

    const results = {
      users,
      communities,
      posts,
    };

    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
