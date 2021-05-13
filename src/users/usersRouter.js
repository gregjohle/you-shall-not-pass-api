const passport = require("passport");

const express = require("express"),
  path = require("path"),
  xss = require("xss"),
  UsersService = require("./usersService.js"),
  UsersRouter = express.Router(),
  jsonParser = express.json(),
  bcrypt = require("bcryptjs");

UsersRouter.route("/login").get((req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ error: "Invalid user or pass" });
    }

    return req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json({
        name: user.name,
        id: user.id,
      });
    });
  })(req, res, next);
});

UsersRouter.route("/").get((req, res) => {
  if (req.isAuthenticated()) {
    let user = {
      id: req.session.passport.user.id,
      name: req.session.passport.user.name,
    };
    res.status(200).json(user);
  } else {
    res.status(401).send("Unauthorized");
  }
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
        .then(res.status(201).send("user added"))
        .catch(next);
    }
  });
});

module.exports = UsersRouter;
