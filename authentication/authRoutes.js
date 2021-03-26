const Router = require("express").Router();
const db = require("../models");
const passport = require("./strategy");
require("dotenv").config();

Router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    (err, user, additionalMessage) => {
      if (err || !user) {
        //TODO should I do anything else when there is an incorrect email???
        return res.status(400).json(additionalMessage);
      }

      req.login(user, { session: false }, (err) => {
        if (err) {
          res.status(500).send(err);
        }
        //TODO when successfully logged in, redirect page
        // const token = "some token";
        // res.json({ email: user.email, token: token });
        res.status(200).json({ message: "successfully logged in" }); //with local strategy
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
    //TODO redirect to login page
    res.json({
      message:
        "email has been already registered with an acount, please login instead",
    });
  }
});

module.exports = Router;
