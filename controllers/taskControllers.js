const Task = require("../models/task.js");
const User = require("../models/User.js");

const addTask = async (req, res) => {
  const {
    category,
    title,
    description,
    location,
    payrate,
    startdate,
    enddate,
  } = req.body;
  try {
    const task = await Task.create({
      category,
      title,
      description,
      location,
      payrate,
      startdate,
      enddate,
    });

    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $push: {
            taskspost: task._id
      }},
      {new: true}
    )

    if (task) {
      res.status(201).json({
        message: "Post added",
        id: task._id,
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
        task: req.body,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Invalid request body",
      task: req.body,
    });
  }
};

const findTask = async (req, res) => {
  const { id } = req.params;
  try {
    const found = await Task.findById(id);
    if (!found) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.status(200).json(found);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

const findAllTasks = async (req, res) => {
  try {
    const found = await Task.find({});
    if (!found) {
      return res.status(404).json({
        message: "No tasks found",
      });
    }
    res.status(200).json(found);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  addTask,
  findTask,
  findAllTasks
};
