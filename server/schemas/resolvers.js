const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
};
