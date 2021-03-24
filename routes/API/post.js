const Post = require("../../controllers/postControllers");
const router = require("express").Router();

router.route("/")
.post(Post.addPost)
.get(Post.getPosts);

router.route("/:id")
.get(Post.getPost)
.delete(Post.deletePost);

module.exports = router;
