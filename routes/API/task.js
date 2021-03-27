const Task = require("../../controllers/taskControllers");
const router = require("express").Router();

router.route("/").post(Task.addTask).get(Task.findAllTasks);

router.route("/:id").get(Task.findTask);

router.route("/assignTask/:id").get(Task.assignTask);

module.exports = router;
