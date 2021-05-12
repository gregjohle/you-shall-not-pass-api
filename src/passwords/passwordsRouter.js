const { v4: uuidv4 } = require("uuid");
const express = require("express");
const path = require("path");
const xss = require("xss");
const PasswordsService = require("./passwordsService");
const PasswordsRouter = express.Router();
const jsonParser = express.json();
const cryptr = require("cryptr");

PasswordsRouter.route("/passwords").get((req, res) => {
  const { id } = req.session;
  console.log(req.session);
  // PasswordsService.getAllPasswords(req.app.get("db"), id).then((passwords) => {
  //   return res.json({ passwords });
  // });
});

module.exports = PasswordsRouter;
