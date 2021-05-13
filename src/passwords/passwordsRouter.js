const { v4: uuidv4 } = require("uuid");
const express = require("express");
const path = require("path");
const xss = require("xss");
const PasswordsService = require("./passwordsService");
const PasswordsRouter = express.Router();
const jsonParser = express.json();
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.SECRET);
const passport = require("passport");

const decryptPassword = (password) => ({
  id: password.id,
  site: password.site,
  username: password.username,
  password: cryptr.decrypt(password.password),
});

PasswordsRouter.route("/")
  .get((req, res) => {
    if (req.isAuthenticated()) {
      let id = req.session.passport.user.id;
      PasswordsService.getAllPasswords(req.app.get("db"), id).then(
        (passwords) => {
          res.json(passwords.map(decryptPassword));
        }
      );
    } else {
      res.status(401).send("Unauthorized");
    }
  })
  .post((req, res) => {
    if (req.isAuthenticated()) {
      const username = xss(req.body.username);
      const site = xss(req.body.site);
      const password = cryptr.encrypt(req.body.password);
      const userId = req.session.passport.user.id;

      const newPassword = {
        username: username,
        site: site,
        password: password,
        user_id: userId,
      };

      console.log(newPassword);
      PasswordsService.insertPassword(req.app.get("db"), newPassword).then(
        res.status(200).send("password added")
      );
    } else res.status(401).send("Unauthorized");
  });

module.exports = PasswordsRouter;
