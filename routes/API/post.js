const Post = require("../../controllers/postControllers");
const router = require("express").Router();

router.route("/")
.post(Post.addPost)

module.exports = router;
