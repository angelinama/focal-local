const User = require("../../controllers/userControllers");
const router = require("express").Router();

router
  .route("/:id")
  .get(User.findUser)

module.exports = router;
