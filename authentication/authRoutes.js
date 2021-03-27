const Router = require("express").Router();
const db = require("../models");
const passport = require("./strategy");
require("dotenv").config();
const jwt = require("jsonwebtoken");

Router.post("/login", (req, res, next) => {
  //???Why here is not "jwt"
  passport.authenticate(
    "local",
    { session: false },
    (err, user, additionalMessage) => {
      if (err || !user) {
        //TODO should I do anything else when there is an incorrect email???
        return res
          .status(400)
          .json({ message: additionalMessage, error: err, user: user });
      }

      req.login(user, { session: false }, (err) => {
        if (err) {
          res.status(500).send(err);
        }
        //TODO when successfully logged in, redirect page
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.PASSPORT_SECRET
        );

        res.status(200).json({
          email: user.email,
          token: token,
          message: "Successfully logged in",
        });
      });
    }
  )(req, res, next);
});

Router.post("/register", async (req, res) => {
  //create a new user in the database from the request
  try {
    const user = await db.User.create(req.body);
    // res.json(user);
    //redirect to welcome page
    res.json("Succefully registered");
  } catch (err) {
    //TODO check if err is caused by duplicate email, i.e. Mongodb error
    res.json({
      err: err,
      message:
        "email has been already registered with an acount, please login instead",
    });
  }
});

module.exports = Router;
