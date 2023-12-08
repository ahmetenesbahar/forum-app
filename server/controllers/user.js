import Category from "../models/Categories";
import User from "../models/User";

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

export const getUserCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const userCategories = await Promise.all(
      user.interestedCategories.map((categoryId) => User.findById(categoryId))
    );
    const formattedUserCategories = userCategories.map(
      ({ _id, categoryName }) => {
        return { _id, categoryName };
      }
    );
    res.status(200).json(formattedUserCategories);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

export const addRemoveCategories = async (req, res) => {
  try {
    const { id, categoryId } = req.params;
    const user = await User.findById(id);
    const category = await Category.findById(categoryId);
    if (user.interestedCategories.includes(categoryId)) {
      user.interestedCategories = user.interestedCategories.filter(
        (id) => id !== categoryId
      );

      category.interestedUsers = category.interestedUsers.filter(
        (id) => id !== id
      );
    } else {
      user.interestedCategories.push(categoryId);
      category.interestedUsers.push(id);
    }

    await user.save();
    await category.save();

    const userCategories = await Promise.all(
      user.interestedCategories.map((categoryId) => User.findById(categoryId))
    );
    const formattedUserCategories = userCategories.map(
      ({ _id, categoryName }) => {
        return { _id, categoryName };
      }
    );

    res.status(200).json(formattedUserCategories);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
