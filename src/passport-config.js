const UsersService = require("./users/usersService.js");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function initialize(passport, getUserByEmail, getUserByID) {
  const authenticateUser = (email, password, done) => {
    const user = getUserByEmail(email);
    console.log(user);
    if (user === undefined) {
      return done(null, false, { message: "No User Found With That Email" });
    }
    try {
      if (bcrypt.compareSync(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new localStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    return done(null, getUserByID(id));
  });
};
