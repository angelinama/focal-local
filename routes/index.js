const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./API");
const authRoutes = require("../authentication/authRoutes");
const passport = require("../authentication/strategy");

//define authentication routes here
router.use("/auth", authRoutes);

// Define API routes here
router.use("/api", passport.authenticate("jwt", { session: false }), apiRoutes);

// Send every other request to the React app
router.get("*", (req, res) => {
  //this route shoule not be authenticated otherwise it will protect the whole react pages including login and signup
  //TODO why the routes is wrong?
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
