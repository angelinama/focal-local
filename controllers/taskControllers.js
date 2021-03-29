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
    const posterId = req.user._id;

    const task = await Task.create({
      posterId,
      category,
      title,
      description,
      location,
      payrate,
      startdate,
      enddate,
      completed: false,
    });

    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $push: {
          taskspost: task._id,
        },
      },
      { new: true }
    );
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
    const found = await Task.find({
      // completed: false,
      posterId: { $ne: req.user.id },
      getterId: null,
    });
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

const assignTask = async (req, res) => {
  try {
    const { id } = req.params;
    const found = await Task.findOneAndUpdate(
      { _id: id },
      { getterId: req.user.id },
      { new: true, useFindAndModify: false }
    );
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

const findAllTasksPostedByMe = async (req, res) => {
  try {
    const found = await Task.find({ posterId: req.user.id });
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

const findAllTasksAssignedToMe = async (req, res) => {
  try {
    const found = await Task.find({ getterId: req.user.id });
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

const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.deleteOne({ _id: req.params.id, completed: false });
    if (deleted.deletedCount !== 1) {
      return res.status(404).json({
        message: "No tasks deleted",
      });
    }
    return res.status(200).json({});
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

const completeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const found = await Task.findOneAndUpdate(
      { _id: id },
      { completed: true },
      { new: true, useFindAndModify: false }
    );
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

// const completedCategories = async (req, res) => {
//   try {
//     res.json({
//       "Home repairs": await Task.count({
//         completed: true,
//         getterId: req.user.id,
//         category: "Home repairs",
//       }),
//       "Shopping": await Task.count({
//         completed: true,
//         getterId: req.user.id,
//         category: "Shopping",
//       }),
//       "Baby sitting": await Task.count({
//         completed: true,
//         getterId: req.user.id,
//         category: "Baby sitting",
//       }),
//       "Pet sitting": await Task.count({
//         completed: true,
//         getterId: req.user.id,
//         category: "Pet sitting",
//       }),
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// };

module.exports = {
  addTask,
  findTask,
  findAllTasks,
  assignTask,
  findAllTasksPostedByMe,
  findAllTasksAssignedToMe,
  deleteTask,
  completeTask,
  // completedCategories,
};
