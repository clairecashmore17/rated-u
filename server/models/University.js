const mongoose = require("mongoose");
const upvoteSchema = require("./Upvote");
const commentSchema = require("./Comment");
const { Schema } = mongoose;

const universitySchema = new Schema({
  university_name: {
    type: String,
    required: true,
    unique: true,
  },
  university_image: {
    type: String,
    required: true,
  },
  majors: {
    type: Schema.Types.ObjectId,
    ref: "Major",
  },
  comments: [commentSchema],
  upvotes: [upvoteSchema],
});

universitySchema.virtual("upvoteCount").get(function () {
  return this.upvotes.length;
});

universitySchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

const University = mongoose.model("University", universitySchema);

module.exports = University;
