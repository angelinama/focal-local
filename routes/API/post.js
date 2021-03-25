const Post = require("../../controllers/postControllers");
//change name to postTask
const router = require("express").Router();

router
  .route("/post")
  .post(Post.addPost)

router
  .route("/:id")
  .get(Post.findPost)

module.exports = router;
