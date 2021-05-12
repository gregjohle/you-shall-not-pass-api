const UsersService = require("./users/usersService.js");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
const environment = process.env.NODE_ENV || "development";
const configuration = require("./database")[environment];
const UsersRouter = require("./users/usersRouter.js");
const database = require("knex")(configuration);

module.exports = function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = await UsersService.getByEmail(database, email);
    if (user === undefined) {
      return done(null, false, { message: "No User Found With That Email" });
    }
    try {
      if (await bcrypt.compareSync(password, user.password)) {
        console.log(user);
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
    return done(null, {
      id: user.id,
      name: user.name,
      email: user.email,
    });
  });

  passport.deserializeUser((id, done) => {
    return done(null, UsersService.getByID(database, id));
  });
};
