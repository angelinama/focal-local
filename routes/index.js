const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./API");
const authRoutes = require("../authentication/authRoutes");

//define authentication routes here
router.use("/auth", authRoutes);

// Define API routes here
router.use("/api", apiRoutes);

// Send every other request to the React app
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

module.exports = router;
