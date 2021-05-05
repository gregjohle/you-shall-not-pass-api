const xss = require("xss");

const PasswordsService = {
  getAllPasswords(knex) {
    return knex.from("passwords").select("*");
  },
  insertPassword(knex, newPassword) {
    return knex
      .into("passwords")
      .insert(newPassword)
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex("notes").select("*").where({ id }).first();
  },
  deletePassword(knex, id) {
    return knex("passwords").where({ id }).delete();
  },
  updatePassword(knex, id, newPasswordFields) {
    return knex("notes").where({ id }).update(newPasswordFields);
  },
};

module.exports = PasswordsService;
