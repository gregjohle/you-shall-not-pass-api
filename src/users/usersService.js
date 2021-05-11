const knex = require("knex");
const db = require("../database");

const UsersService = {
  getAllUsers(knex) {
    return knex.from("users").select("*");
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
    return knex(db).from("users").select("*").where({ email }).first();
  },

  getByID(knex, id) {
    return knex.from("users").select("*").where({ id }).first();
  },

  deleteUser(knex, id) {
    return knex("users").delete(id);
  },

  updateUser(knex, id, newUserFields) {
    return knex("users").where({ id }).update(newUserFields);
  },
};

module.exports = UsersService;
