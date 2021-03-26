const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./API");
const authRoutes = require("../authentication/authRoutes");
const passport = require("../authentication/strategy");

//define authentication routes here
router.use("/auth", authRoutes);

// Define API routes here
// router.use("/api", passport.authenticate("jwt", { session: false }), apiRoutes);
router.use("/api", apiRoutes);

// Send every other request to the React app
router.get("*", (req, res) => {
  //TODO  error from postman build folder does not exist
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
  // res.json("protected route");
});

module.exports = router;
