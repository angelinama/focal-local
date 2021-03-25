const router = require("express").Router();

router.use("/task", require("./task"));

//example (coming up):
// router.use("/message", require("./message"));

module.exports = router;
