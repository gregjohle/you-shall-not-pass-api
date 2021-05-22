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

PasswordsRouter.route("/delete").post((req, res) => {
  let { id } = req.body;
  console.log(id);
  if (id === undefined) {
    return res.status(401).json({ message: "No ID Supplied" });
  } else {
    PasswordsService.deletePassword(req.app.get("db"), id).then(() => {
      return res.status(200).json({ message: "Password deleted" });
    });
  }
});

//route to add a password
PasswordsRouter.route("/add").post((req, res) => {
  console.log(req.body);
  const username = xss(req.body.username);
  const site = xss(req.body.site);
  const password = cryptr.encrypt(req.body.password);
  const userId = req.body.user_id;

  const newPassword = {
    username: username,
    site: site,
    password: password,
    user_id: userId,
  };

  PasswordsService.insertPassword(req.app.get("db"), newPassword).then(
    (password) => {
      res.status(200).json({ password });
    }
  );
});

module.exports = PasswordsRouter;
