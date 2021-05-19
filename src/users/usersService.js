const environment = process.env.NODE_ENV || "development"; // if something else isn't setting ENV, use development
const bcrypt = require("bcryptjs");
const configuration = require("../database")[environment]; // require environment's settings from knexfile
const database = require("knex")(configuration); // connect to DB via knex using env's settings

const UsersService = {
  getAllUsers() {
    return database.from("users").select("*");
  },

  insertUser(newUser) {
    return database
      .insert(newUser)
      .into("users")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },

  getByEmail(email) {
    return database.from("users").select("*").where({ email }).first();
  },

  validateUSer(userPass, password) {
    if (bcrypt.compareSync(password, userPass)) {
      return true;
    }
    return false;
  },

  getByID(id) {
    return database.from("users").select("*").where({ id }).first();
  },

  deleteUser(id) {
    return database.from("users").delete(id);
  },

  updateUser(id, newUserFields) {
    return database("users").where({ id }).update(newUserFields);
  },
};

module.exports = UsersService;
