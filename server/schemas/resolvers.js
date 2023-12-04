const { AuthenticationError } = require("apollo-server-express");
const { User, University } = require("../models");
const { Major } = require("../models");
const { signToken } = require("../utils/auth");
const { findById } = require("../models/User");
const {
  GMU,
  GWU,
  VTECH,
  GTOWN,
  UMD,
  MU,
  TRINITY,
} = require("../utils/universities");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .select("-__v -password")
          .populate("university")
          .populate("friends")
          .populate("upvotes")
          .populate("major");

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return User.find()
        .populate("university")
        .select("-__v -password")
        .populate("university")
        .populate("friends")
        .populate("upvotes")
        .populate("major");
    },
    otherUser: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("university")
        .populate("friends")
        .populate("upvotes")
        .populate("major");
    },

    majors: async () => {
      return Major.find();
    },
    universities: async () => {
      return University.find().populate("upvotes").populate("majors");
    },
    university: async (parent, { universityName }) => {
      // console.log(universityName);
      const university = await University.findOne({
        university_name: universityName,
      })
        .populate("majors")
        .populate("upvotes")
        .populate("comments");
      return university;
    },
    universityByMajor: async (parent, { majorName }) => {
      const major = await Major.findOne({ major_name: majorName });

      return await University.find({
        majors: { $in: [major._id] },
      }).populate("majors");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const uni_email = args.email.split("@")[1];
      // console.log(uni_email);
      var user_university = "";
      // Assigning University
      switch (uni_email) {
        case "gwu.edu":
          // console.log(`You go to ${GWU}`);
          user_university = GWU;
          break;
        case "gmu.edu":
          user_university = GMU;
          // console.log(`You go to ${GMU}`);
          break;
        case "vt.edu":
          user_university = VTECH;
          // console.log(`You go to ${VTECH}`);
          break;
        case "georgetown.edu":
          user_university = GTOWN;
          // console.log(`You go to ${VTECH}`);
          break;
        case "umd.edu":
          user_university = UMD;
          // console.log(`You go to ${VTECH}`);
          break;
        case "marymount.edu":
          user_university = MU;
          // console.log(`You go to ${VTECH}`);
          break;
        case "trinitydc.edu":
          user_university = TRINITY;
          // console.log(`You go to ${VTECH}`);
          break;
        default:
          throw new AuthenticationError(
            "We do not have this university in our collection!"
          );
          break;
      }

      const found_uni = await University.findOne({
        university_name: user_university,
      });
      const user = await User.create({ ...args, university: found_uni._id });

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
    updateUserMajor: async (parent, { major_name }, context) => {
      console.log("in update user");
      if (context.user) {
        console.log("Context exists");
        const major = await Major.findOne({ major_name: major_name });
        console.log(JSON.stringify(major));
        console.log(major._id);
        const updatedUser = User.findOneAndUpdate(
          { _id: context.user._id },
          { major: { _id: major._id } },
          { new: true }
        );
        return updatedUser.populate("major");
      }
      throw new AuthenticationError("You need to be logged in!");
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
      throw new AuthenticationError("You need to be logged in!");
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const newFriend = await User.findById(friendId);
        const user = await User.findById(context.user._id);
        if (friendId === context.user._id) {
          throw new Error("Cannot add yourself!");
        }
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

        // console.log(university.upvotes);
        //Filter out if any matching IDs in friend list
        const result = university.upvotes.filter(function (el) {
          return el.username == context.user.username;
        });
        // console.log("RESULT \n:" + result);
        if (result == "") {
          // console.log("no matching username in upvote, adding upvote. \n");
          const upvote = await University.findByIdAndUpdate(
            { _id: universityId },
            { $push: { upvotes: { username: context.user.username } } },
            { new: true }
          );
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { upvotes: { _id: upvote._id } } },
            { new: true }
          );
          return University;
        } else {
          throw new Error("Cannot upvote same university twice");
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, { universityId, commentText }, context) => {
      if (context.user) {
        const updatedUniversity = await University.findOneAndUpdate(
          { _id: universityId },
          {
            $push: {
              comments: { commentText, username: context.user.username },
            },
          },
          { new: true }
        );
        return updatedUniversity;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteComment: async (parent, { universityId, _id }, context) => {
      if (context.user) {
        const deletedComment = await University.findOneAndUpdate(
          { _id: universityId },
          {
            $pull: {
              comments: { _id: _id },
            },
          },
          { new: true }
        );
        return deletedComment;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
