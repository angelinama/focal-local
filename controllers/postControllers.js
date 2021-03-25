const MakeTask = require("../models/post");

const addPost = async (req, res) => {
  const {
    userId,
    category,
    title,
    description,
    payrate,
    startdate,
    enddate,
  } = req.body;
  try {
    const post = await MakeTask.create({
      userId,
      category,
      title,
      description,
      payrate,
      startdate,
      enddate,
    });
    if (post) {
      res.status(201).json({
        message: "Post added",
        id: post._id,
      });
    } else {
      res.status(400).json({
        message: "Error",
        post: req.body,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error",
      post: req.body,
    });
  }
};

const findPost = async (req, res) => {
  const { id } = req.params;
  try {
    const found = await MakeTask.findby(id);
    if (!found){
      return res.status(404).json({
        message: "Post not found"
      })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  addPost,
  findPost,
};
