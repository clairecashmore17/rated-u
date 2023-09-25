const { Schema } = require("mongoose");

const upvoteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = upvoteSchema;
