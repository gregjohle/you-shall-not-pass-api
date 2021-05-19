require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { NODE_ENV } = require("./config");
const UsersRouter = require("./users/usersRouter");
const PasswordsRouter = require("./passwords/passwordsRouter");
const initializePassport = require("./passport-config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const morganOption = NODE_ENV === "production" ? "tiny" : "dev";

app.use(morgan(morganOption));
app.use(helmet());
var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["POST", "GET"],
};
app.use(cors());

app.use("/api/users", UsersRouter);
app.use("/api/passwords", PasswordsRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
