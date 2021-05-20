const environment = process.env.NODE_ENV || "development";
const bcrypt = require("bcryptjs");
// const configuration = require("../database")[environment];
// const database = require("knex")(configuration);

const UsersService = {
  getAllUsers() {
    return database.from("users").select("*");
  },

  insertUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into("users")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },

  getByEmail(knex, email) {
    return knex("users").select("*").where({ email }).first();
  },

  getByID(knex, id) {
    return knex.from("users").select("*").where({ id }).first();
  },

  deleteUser(knex, id) {
    return knex.from("users").delete(id);
  },

  updateUser(knex, id, newUserFields) {
    return knex("users").where({ id }).update(newUserFields);
  },
};

module.exports = UsersService;
