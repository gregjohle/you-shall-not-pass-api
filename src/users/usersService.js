const environment = process.env.NODE_ENV || "development";
const bcrypt = require("bcryptjs");
const configuration = require("../database")[environment];
const database = require("knex")(configuration);

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
    console.log(database);
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
