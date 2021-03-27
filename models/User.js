const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: "password is required",
  },
  phone: {
    type: String,
    trim: true,
  },
  userName: {
    type: String,
    required: "userName is required",
    trim: true,
    unique: true,
  },
  taskspost: [
    {
      type: Schema.Types.ObjectID,
      ref: "Task",
    },
  ],
  tasksget: [
    {
      type: Schema.Types.ObjectID,
      ref: "Task",
    },
  ],
});

//TODO add crypto for password
const User = mongoose.model("User", userSchema);

module.exports = User;
