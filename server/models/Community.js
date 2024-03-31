import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema({
  communityName: {
    type: String,
    required: true,
    unique: true,
  },
  picturePath: {
    type: String,
    default: "",
    required: true,
  },
  communityBio: {
    type: String,
    default: "",
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  interestedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Community = mongoose.model("Community", CommunitySchema);
export default Community;
