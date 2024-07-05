import mongoose from "mongoose";
import Community from "../models/Community.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

/*CREATE*/

export const createPost = async (req, res) => {
  try {
    const { userId, title, content, picturePath, community } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      author: userId,
      profileName: user.profileName,
      profilePicturePath: user.picturePath,
      title,
      content,
      picturePath,
      community,
      votes: [],
      comments: [],
    });

    await newPost.save();

    await User.findByIdAndUpdate(userId, {
      $push: { posts: newPost._id },
    });

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/*READ*/

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find().populate("author").populate("community");
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id)
      .populate("author")
      .populate("community");
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId })
      .populate("author")
      .populate("community");
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getLatestPosts = async (req, res) => {
  try {
    const latestPosts = await Post.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$community",
          posts: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: {
          newRoot: "$posts",
        },
      },
    ]);
    const populatedLatestPosts = await Post.populate(latestPosts, [
      { path: "author" },
      { path: "community" },
    ]);
    res.status(200).json(populatedLatestPosts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

export const comment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, text } = req.body;
    const post = await Post.findById(id);
    post.comments.push({ text: text, author: userId });
    await post.save();
    const savedComment = post.comments[post.comments.length - 1]; //! buradan emin değilim
    const commentId = savedComment._id;
    await User.findByIdAndUpdate(userId, {
      $push: {
        comments: { commentId: commentId, text: text },
      },
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const upVote = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isVoted = post.votes.some((vote) => vote.userId.equals(userId));
    const voteType = post.votes.find((vote) =>
      vote.userId.equals(userId)
    )?.type;

    if (isVoted) {
      if (voteType === "downvote") {
        post.votes = post.votes.filter((vote) => !vote.userId.equals(userId));
        post.votes.push({ userId: userId, type: "upvote" });

        await User.findByIdAndUpdate(userId, {
          $pull: {
            votes: { postId: id, type: "downvote" },
          },
        });
        await User.findByIdAndUpdate(userId, {
          $push: {
            votes: { postId: id, type: "upvote" },
          },
        });
      } else {
        post.votes = post.votes.filter((vote) => !vote.userId.equals(userId));
        await User.findByIdAndUpdate(userId, {
          $pull: {
            votes: { postId: id, type: "upvote" },
          },
        });
      }
    } else {
      post.votes.push({ userId: userId, type: "upvote" });
      await User.findByIdAndUpdate(userId, {
        $push: {
          votes: { postId: id, type: "upvote" },
        },
      });
    }
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const downVote = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isVoted = post.votes.some((vote) => vote.userId.equals(userId));
    const voteType = post.votes.find((vote) =>
      vote.userId.equals(userId)
    )?.type;

    if (isVoted) {
      if (voteType === "upvote") {
        post.votes = post.votes.filter((vote) => !vote.userId.equals(userId));
        post.votes.push({ userId: userId, type: "downvote" });
        await User.findByIdAndUpdate(userId, {
          $pull: {
            votes: { postId: id, type: "upvote" },
          },
        });
        await User.findByIdAndUpdate(userId, {
          $push: {
            votes: { postId: id, type: "downvote" },
          },
        });
      } else {
        post.votes = post.votes.filter((vote) => !vote.userId.equals(userId));
        await User.findByIdAndUpdate(userId, {
          $pull: {
            votes: { postId: id, type: "downvote" },
          },
        });
      }
    } else {
      post.votes.push({ userId: userId, type: "downvote" });
      await User.findByIdAndUpdate(userId, {
        $push: {
          votes: { postId: id, type: "downvote" },
        },
      });
    }
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
//DELETE

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id)
      .populate("author")
      .populate("community");

    await User.findByIdAndUpdate(post.author, {
      $pull: { posts: id },
    });
    await Community.findByIdAndUpdate(post.community, {
      $pull: { posts: id },
    });
    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
