import Community from "../models/Community.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

/* READ */

export const searchAll = async (req, res) => {
  try {
    const { searchParameter } = req.query;
    const stringParameter = String(searchParameter);
    const users = await User.find({
      profileName: { $regex: stringParameter },
    });
    const communities = await Community.find({
      communityName: { $regex: stringParameter },
    });
    const posts = await Post.find({ title: { $regex: stringParameter } });

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
