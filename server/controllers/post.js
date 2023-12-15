import Post from "../models/Post.js";
import User from "../models/User.js";

/*CREATE*/

export const createPost = async (req, res) => {
  try {
    const { userId, title, content, images, category } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      profileName: user.profileName,
      profilePicturePath: user.picturePath,
      title,
      content,
      images,
      category,
      votes: [],
      comments: [],
    });

    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/*READ*/

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

export const upVote = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isVoted = post.votes.get(userId);

    if (isVoted) {
      post.votes = post.votes.filter((vote) => !vote.user.equals(userId));
    } else {
      post.votes.push({ user: userId, type: "upvote" });
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { votes: post.votes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const downVote = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isVoted = post.votes.find((vote) => vote.user.equals(userId));

    if (isVoted) {
      post.votes = post.votes.filter((vote) => !vote.user.equals(userId));
    } else {
      post.votes.push({ user: userId, type: "downvote" });
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { votes: post.votes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};