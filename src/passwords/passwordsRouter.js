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

PasswordsRouter.route("/passwords")
  .get((req, res) => {
    const user = passport.deserializeUser(req.sessionID, done);

    PasswordsService.getAllPasswords(req.app.get("db"), user.id).then(
      (passwords) => {
        return res.json({ passwords });
      }
    );
  })
  .post((req, res) => {
    const name = xss(req.body.name);
    const site = xss(req.body.site);
    const password = crpytr.encrypt(req.body.password);
    const userId = "1";

    const newPassword = {
      name: name,
      site: site,
      password: password,
      user_id: userId,
    };
    console.log(newPassword);
    PasswordsService.insertPassword(req.app.get("db"), newPassword).then(
      res.status(200).send("password added")
    );
  });

module.exports = PasswordsRouter;
