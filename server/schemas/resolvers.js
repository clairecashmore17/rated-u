const { AuthenticationError } = require("apollo-server-express");
const { User, University } = require("../models");
const { Major } = require("../models");
const { signToken } = require("../utils/auth");
const { findById } = require("../models/User");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate("friends");

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return User.find();
    },
    majors: async () => {
      return Major.find();
    },
    universities: async () => {
      return University.find().populate("upvotes");
    },
    university: async (parent, { universityName }) => {
      const university = await University.findOne({ universityName })
        .populate("majors")
        .populate("upvotes");
      return university;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    // THIS IS NOT WORKING (Possibly a object casting issue)
    deleteFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const newFriend = await User.findById(friendId);
        console.log(typeof newFriend._id);
        console.log(
          `Deleting friend ${newFriend.username} with ID ${newFriend.id}`
        );
        const deletedFriend = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: { friends: { _id: friendId } },
          },
          { new: true }
        );
        // console.log(deletedFriend);

        return deletedFriend.populate("friends");
      }
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const newFriend = await User.findById(friendId);
        const user = await User.findById(context.user._id);
        //Filter out if any matching IDs in friend list
        const result = user.friends.filter((id) => id == friendId);
        if (result == "") {
          console.log("no matching ID in friends list, adding friend. \n");
          const newUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            {
              $push: { friends: { _id: newFriend.id } },
            },
            { new: true }
          );
        } else {
          throw new Error("Cannot add same friends twice");
        }

        return user.populate("friends");
      }

      throw new AuthenticationError("Not logged in");
    },
    addUpvote: async (parent, { universityId }, context) => {
      if (context.user) {
        const university = await University.findById(universityId);

        console.log(
          `**** University updating*****${university.upvotes[0].username}`
        );
        console.log(context.user.username);
        console.log(university.upvotes);
        //Filter out if any matching IDs in friend list
        const result = university.upvotes.filter(function (el) {
          return el.username == context.user.username;
        });
        console.log("RESULT \n:" + result);
        if (result == "") {
          console.log("no matching username in upvote, adding upvote. \n");
          const upvote = await University.findByIdAndUpdate(
            { _id: universityId },
            { $push: { upvotes: { username: context.user.username } } },
            { new: true }
          );
          return University;
        } else {
          throw new Error("Cannot upvote same university twice");
        }
      }
    },
  },
};

module.exports = resolvers;
