const Task = require("../../controllers/taskControllers");
const router = require("express").Router();

router
  .route("/")
  .post(Task.addTask)
  // .get(Task)

router
  .route("/:id")
  .get(Task.findTask)

module.exports = router;
