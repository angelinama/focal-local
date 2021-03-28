const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = mongoose.Schema({
  posterId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  getterId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    required: true,
    enum: ["Home repairs", "Shopping", "Baby sitting", "Pet sitting"],
  },
  title: {
    type: String,
    required: true,
    maxLength: 50,
    minLength: 8,
  },
  description: {
    type: String,
    required: true,
    maxLength: 250,
    minLength: 20,
  },
  location: {
    type: String,
  },
  payrate: {
    type: Number,
    required: true,
    min: 0,
  },
  startdate: {
    type: Date,
    required: true,
  },
  enddate: {
    type: Date,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
