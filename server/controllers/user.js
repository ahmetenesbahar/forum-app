import Community from "../models/Community.js";
import User from "../models/User.js";

/* READ */

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id); //find user that matches the id
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserCommunities = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const userCommunities = await Promise.all(
      user.interestedCommunities.map((communityId) =>
        User.findById(communityId)
      )
    );
    const formattedUserCommunities = userCommunities.map(
      ({ _id, communityName }) => {
        return { _id, communityName };
      }
    );
    res.status(200).json(formattedUserCommunities);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

export const addRemoveCommunities = async (req, res) => {
  try {
    const { id, communityId } = req.params;
    const user = await User.findById(id);
    const community = await Community.findById(communityId);
    if (user.interestedCommunities.includes(communityId)) {
      user.interestedCommunities = user.interestedCommunities.filter(
        (id) => id !== communityId
      );

      community.interestedUsers = community.interestedUsers.filter(
        (id) => id !== id
      );
    } else {
      user.interestedCommunities.push(communityId);
      community.interestedUsers.push(id);
    }

    await user.save();
    await community.save();

    const userCommunities = await Promise.all(
      user.interestedCommunities.map((communityId) =>
        User.findById(communityId)
      )
    );
    const formattedUserCommunities = userCommunities.map(
      ({ _id, communityName }) => {
        return { _id, communityName };
      }
    );

    res.status(200).json(formattedUserCommunities);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
