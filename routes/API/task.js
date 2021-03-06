const Task = require("../../controllers/taskControllers");
const router = require("express").Router();

router.route("/").post(Task.addTask).get(Task.findAllTasks);

router.route("/:id").get(Task.findTask).delete(Task.deleteTask);

router.route("/complete/:id").get(Task.completeTask);

//router.route("/completed/").get(Task.completedCategories);

router.route("/assignTask/:id").post(Task.assignTask);

router.route("/myboard/postedbyme").get(Task.findAllTasksPostedByMe);

router.route("/myboard/assignedtome").get(Task.findAllTasksAssignedToMe);

module.exports = router;
