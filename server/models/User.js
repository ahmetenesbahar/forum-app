import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  profileName: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  picturePath: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    max: 250,
  },
  interestedCommunities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  votes: [
    {
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
      type: {
        type: String,
        enum: ["upvote", "downvote"],
      },
    },
  ],
  comments: [
    {
      text: {
        type: String,
      },
      commentId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
