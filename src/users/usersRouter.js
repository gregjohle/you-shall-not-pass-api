const express = require("express"),
  path = require("path"),
  xss = require("xss"),
  UsersService = require("./usersService.js"),
  UsersRouter = express.Router(),
  jsonParser = express.json(),
  bcrypt = require("bcryptjs");

UsersRouter.route("/")
  .get((req, res, next) => {
    UsersService.getByEmail(req.app.get("db"), req.body.email)
      .then((user) => {})
      .catch(next);
  })
  .post((req, res, next) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, process.env.SALT);
    const newUser = { name, email, hashedPassword };
    UsersService.getByEmail(req.app.get("db"), req.body.email)
      .then((user) =>{
        if (user) {
          res.send("A User already exists with that email.")
        }
        if (!user) {
          UsersService.insertUser(req.app.get("db"), newUser)
          .then((res) => {
            res.send("user added")
          })
          .catch(next)
        }
      })

    UsersService.insertUser(req.app.get("db"), newUser)
  });
