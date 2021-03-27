const User = require("../models/User.js");

const findUser = async (req, res) => {
  const { id } = req.params;
  try {
    const found = await User.findById(id);
    if (!found) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({email: found.email});
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error.message,
    });
  }
};


module.exports = {
  findUser
};
