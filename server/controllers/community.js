import Community from "../models/Community.js";
import User from "../models/User.js";

/* READ */

export const getUserCommunities = async (req, res) => {
  try {
    const { id } = req.params;
    const community = await Community.findById(id); //find community that matches the id
    res.status(200).json(community);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getCommunities = async (req, res) => {
  try {
    const community = await Community.find();
    res.status(200).json(community);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/*CREATE*/

export const createCommunity = async (req, res) => {
  try {
    const { userId, communityName, communityBio, picturePath } = req.body;

    const newCommunity = new Community({
      author: userId,
      communityName,
      communityBio,
      picturePath,
      interestedUsers: [userId],
    });

    await newCommunity.save();

    await User.findByIdAndUpdate(userId, {
      $push: { interestedCommunities: newCommunity._id },
    });

    const community = await Community.find();
    res.status(201).json(community);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
