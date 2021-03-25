const MakeTask = require("../../controllers/postControllers");
//change name to postTask
const router = require("express").Router();

router
  .route("/post")
  .post(MakeTask.addPost)

router
  .route("/:id")
  .get(MakeTask.findPost)

module.exports = router;
