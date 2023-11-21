const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  university: {
    type: Schema.Types.ObjectId,
    ref: "University",
    required: false,
  },
  major: {
    type: Schema.Types.ObjectId,
    ref: "Major",
    required: false,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  upvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "University",
    },
  ],
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

//compare incoming password with hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.virtual("upvotedUniversities").get(function () {
  return this.upvotes.length;
});
const User = mongoose.model("User", userSchema);

module.exports = User;
