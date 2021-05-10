const express = require("express"),
  path = require("path"),
  xss = require("xss"),
  UsersService = require("./usersService.js"),
  UsersRouter = express.Router(),
  jsonParser = express.json(),
  bcrypt = require("bcryptjs");

function hashThePassword(password) {
  async (res, doc) => {
    await bcrypt.hash(password, 10);
  };
}

UsersRouter.route("/login").post((req, res, next) => {
  UsersService.getByEmail(req.app.get("db"), req.body.email)
    .then((user) => {
      if (user === undefined) {
        res.send("Invalid User");
      }
      if (bcrypt.compareSync(req.body.password, user.password) === false) {
        res.send("Invalid Password");
      }
      if (bcrypt.compareSync(req.body.password, user.password) === true) {
        res.send("logged in");
      }
    })
    .catch(next);
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
        name: req.body.name,
        email: req.body.email,
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
