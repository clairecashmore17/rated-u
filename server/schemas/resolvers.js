const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");

const { signToken } = require("../utils/auth");

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
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const newFriend = await User.findById(friendId);
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $push: { friends: { _id: newFriend.id } },
          },
          { new: true }
        );
        return user.populate("friends");
      }

      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
