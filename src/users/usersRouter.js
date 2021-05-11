const passport = require("passport");
const jwtToken = require("passport-jwt");

const express = require("express"),
  path = require("path"),
  xss = require("xss"),
  UsersService = require("./usersService.js"),
  UsersRouter = express.Router(),
  jsonParser = express.json(),
  bcrypt = require("bcryptjs");

UsersRouter.route("/login").post((req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ error: "Invalid user or pass" });
    }

    return res.json({ jwtToken: process.env.SECRET });
  })(req, res, next);
});

// Route to add a new user to the site
UsersRouter.route("/register").post((req, res, next) => {
  const { name, email, password } = req.body;
  UsersService.getByEmail(req.app.get("db"), req.body.email).then((user) => {
    if (user) {
      res.send("A User already exists with that email.");
    }
    if (!user) {
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      const newUser = {
        name: xss(req.body.name),
        email: xss(req.body.email),
        password: hashedPassword,
      };
      console.log(newUser);
      UsersService.insertUser(req.app.get("db"), newUser)
        .then(res.send("user added"))
        .catch(next);
    }
  });
});

module.exports = UsersRouter;
