const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
require("dotenv").config();

// local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, cb) => {
      // get a user from the database
      const user = await db.User.findOne({ email });
      try {
        if (!user) {
          // send a message back about emails and passwords
          return cb(null, null, {
            message: "Incorrect email",
          });
        }
        // does the password match
        if (password === user.password) {
          return cb(null, user, {
            message: "Successfully logged in",
          });
        }
      } catch (err) {
        return cb(err, null, { message: "something went wrong" });
      }
    }
  )
);

//JWT Strategy
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.PASSPORT_SECRET,
    },
    async function (jwtPayload, cb) {
      //TODO should this be jwtPayload.sub? from the JWT website
      const user = await db.User.find({ _id: jwtPayload.id });
      try {
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);
module.exports = passport;
