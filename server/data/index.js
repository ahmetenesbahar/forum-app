import mongoose from "mongoose";

export const communities = [
  {
    _id: new mongoose.Types.ObjectId(),
    communityName: "Technology",
    interestedUsers: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    communityName: "Science",
    interestedUsers: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    communityName: "Programming",
    interestedUsers: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    communityName: "Travel",
    interestedUsers: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    communityName: "Food",
    interestedUsers: [],
  },
];

export const users = [
  {
    _id: new mongoose.Types.ObjectId(),
    userName: "john_doe",
    profileName: "John Doe",
    email: "john@example.com",
    password: "password123",
    bio: "This is John Doe's bio.",
    interestedCommunities: [communities[4]._id, communities[1]._id],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userName: "jane_smith",
    profileName: "Jane Smith",
    email: "jane@example.com",
    password: "securepass",
    bio: "Jane Smith's bio goes here.",
    interestedCommunities: [communities[4]._id, communities[2]._id],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userName: "alex_wilson",
    profileName: "Alex Wilson",
    email: "alex@example.com",
    password: "12345678",
    bio: "Alex Wilson's bio.",
    interestedCommunities: [communities[0]._id, communities[2]._id],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userName: "emma_jones",
    profileName: "Emma Jones",
    email: "emma@example.com",
    password: "password987",
    bio: "Emma Jones's bio.",
    interestedCommunities: [communities[1]._id, communities[2]._id],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userName: "sam_carter",
    profileName: "Sam Carter",
    email: "sam@example.com",
    password: "sam123",
    bio: "Sam Carter's bio.",
    interestedCommunities: [communities[3]._id, communities[2]._id],
  },
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Introduction to MongoDB",
    content: "This is a post about MongoDB.",
    images: ["https://example.com/image1.jpg"],
    author: users[0]._id,
    community: communities[0]._id,
    votes: [],
    comments: [
      {
        text: "Great post!",
        author: users[1]._id,
      },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "ReactJS Basics",
    content: "Learn the basics of ReactJS in this post.",
    images: ["https://example.com/image2.jpg"],
    author: users[1]._id,
    community: communities[0]._id,
    votes: [],
    comments: [
      {
        text: "Awesome content!",
        author: users[0]._id,
      },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Exploring Machine Learning",
    content: "A journey into the world of machine learning.",
    images: ["https://example.com/image3.jpg"],
    author: users[2]._id,
    community: communities[1]._id,
    votes: [],
    comments: [
      {
        text: "Fascinating!",
        author: users[3]._id,
      },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Cooking Adventures",
    content: "Discover new recipes and cooking techniques.",
    images: ["https://example.com/image4.jpg"],
    author: users[3]._id,
    community: communities[4]._id,
    votes: [],
    comments: [
      {
        text: "Delicious!",
        author: users[2]._id,
      },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Travel Diaries",
    content: "Explore the world through the eyes of a traveler.",
    images: ["https://example.com/image5.jpg"],
    author: users[4]._id,
    community: communities[3]._id,
    votes: [],
    comments: [
      {
        text: "Amazing places!",
        author: users[1]._id,
      },
    ],
  },
];
