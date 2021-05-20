const { v4: uuidv4 } = require("uuid");
const express = require("express");
const path = require("path");
const xss = require("xss");
const PasswordsService = require("./passwordsService");
const PasswordsRouter = express.Router();
const jsonParser = express.json();
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.SECRET);
const UsersService = require("../users/usersService");
const bcrypt = require("bcryptjs");

// template for decrpyting passwords before being sent to the client
const decryptPassword = (password) => ({
  id: password.id,
  site: password.site,
  username: password.username,
  password: cryptr.decrypt(password.password),
});

// route to get all passwords for a specific user
PasswordsRouter.route("/").post((req, res) => {
  let { user_id } = req.body;
  if (user_id === undefined) {
    return res.status(200).json("No id, fool.");
  }
  PasswordsService.getAllPasswords(req.app.get("db"), user_id).then(
    (passwords) => {
      res.json(passwords.map(decryptPassword));
    }
  );
});

//route to add a password
PasswordsRouter.route("/add").post((req, res) => {
  const username = xss(req.body.newPassword.username);
  const site = xss(req.body.newPassword.site);
  const password = cryptr.encrypt(req.body.newPassword.password);
  const userId = req.body.newPassword.user_id;

  const newPassword = {
    username: username,
    site: site,
    password: password,
    user_id: userId,
  };

  PasswordsService.insertPassword(req.app.get("db"), newPassword).then(
    res.status(200).send("password added")
  );
});

module.exports = PasswordsRouter;
