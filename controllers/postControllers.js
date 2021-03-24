const Post = require("../models/post");

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
    const post = await Post.create({
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
    res.status(400).json({
      message: "Error",
      post: req.body,
    });
  }
};




module.exports = {
  addPost,
};
