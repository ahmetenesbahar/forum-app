import Community from "../models/Community.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

/* READ */

export const searchAll = async (req, res) => {
  try {
    const { searchParameter } = req.query;
    const user = await User.find({ profileName: searchParameter });
    const community = await Community.find({ communityName: searchParameter });
    const post = await Post.find({ title: searchParameter });

    const results = {
      user,
      community,
      post,
    };

    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
