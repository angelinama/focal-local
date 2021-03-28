const router = require("express").Router();

router.use("/task", require("./task"));
router.use("/user", require("./user"));

module.exports = router;
