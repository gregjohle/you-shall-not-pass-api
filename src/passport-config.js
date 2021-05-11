const UsersService = require("./users/usersService.js");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
const environment = process.env.NODE_ENV || "development"; // if something else isn't setting ENV, use development
const configuration = require("./database")[environment]; // require environment's settings from knexfile
const database = require("knex")(configuration); // connect to DB via knex using env's settings

module.exports = function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = await UsersService.getByEmail(database, email);
    console.log(user);
    if (user === undefined) {
      return done(null, false, { message: "No User Found With That Email" });
    }
    try {
      if (await bcrypt.compareSync(password, user.password)) {
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
    return done(null, UsersService.getByID(database, id));
  });
};
