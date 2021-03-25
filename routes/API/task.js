const Task = require("../../controllers/postControllers");
//change name to postTask
const router = require("express").Router();

router
  .route("/post")
  .post(Task.addPost)

router
  .route("/:id")
  .get(Task.findPost)

module.exports = router;
