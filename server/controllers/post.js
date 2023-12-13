import post from "../models/Post.js";

/*CREATE*/

export const createPost = async (req, res) => {
  try {
    const { userId, title, content, images, category } = req.body;
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
