const mongoose = require("mongoose");

const { Schema } = mongoose;

const majorSchema = new Schema({
  major_name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 280,
  },
});

const Major = mongoose.model("Major", majorSchema);

module.exports = Major;
