const { Schema } = require("mongoose");

const upvoteSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
});

module.exports = upvoteSchema;
