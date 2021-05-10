require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const { NODE_ENV } = require("./config");
const UsersRouter = require("./users/usersRouter");
const initializePassport = require("./passport-config");
const UsersService = require("./users/usersService");
const flash = require("express-flash");

const app = express();

initializePassport(
  passport,
  (email) => UsersService.getByEmail("db", email),
  (id) => UsersService.getByID("db", id)
);

app.use(express.urlencoded({ extended: false }));
app.use(flash());
const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(
  cors({
    credentials: true,
  })
);

app.use(cookieParser(process.env.SECRET));

app.use("/api/users", UsersRouter);
// app.use("/api/passwords", passwordsRouter);

// app.get("/", (req, res) => {
//   res.send("Hello, world!");
// });

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
