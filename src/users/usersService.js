const environment = process.env.NODE_ENV || "development"; // if something else isn't setting ENV, use development
const configuration = require("../database")[environment]; // require environment's settings from knexfile
const database = require("knex")(configuration); // connect to DB via knex using env's settings

const UsersService = {
  getAllUsers(knex) {
    return database.from("users").select("*");
  },

  insertUser(knex, newUser) {
    return database
      .insert(newUser)
      .into("users")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },

  getByEmail(knex, email) {
    return database.from("users").select("*").where({ email }).first();
  },

  getByID(knex, id) {
    return database.from("users").select("*").where({ id }).first();
  },

  deleteUser(knex, id) {
    return database.from("users").delete(id);
  },

  updateUser(knex, id, newUserFields) {
    return knex("users").where({ id }).update(newUserFields);
  },
};

module.exports = UsersService;
