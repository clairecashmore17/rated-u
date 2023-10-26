const mongoose = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    universityId: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    commentText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = commentSchema;
