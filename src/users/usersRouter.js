const passport = require("passport");

const express = require("express"),
  path = require("path"),
  xss = require("xss"),
  UsersService = require("./usersService.js"),
  UsersRouter = express.Router(),
  jsonParser = express.json(),
  bcrypt = require("bcryptjs");

UsersRouter.route("/login").post(
  passport.authenticate("local", {
    failureFlash: true,
  })
);

// req, res, next;

// UsersService.getByEmail(req.app.get("db"), req.body.email)
//   .then((user) => {
//     if (user === undefined) {
//       res.send("Invalid User");
//     }
//     if (bcrypt.compareSync(req.body.password, user.password) === false) {
//       res.send("Invalid Password");
//     }
//     if (bcrypt.compareSync(req.body.password, user.password) === true) {
//       res.send("logged in");
//     }
//   })
//   .catch(next);
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
