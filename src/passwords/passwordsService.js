const xss = require("xss");

const PasswordsService = {
  getAllPasswords(knex, user_id) {
    return knex.from("passwords").select("*").where({ user_id });
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
  deletePassword(knex, id) {
    return knex("passwords").where({ id }).delete();
  },
  updatePassword(knex, id, newPasswordFields) {
    return knex("notes").where({ id }).update(newPasswordFields);
  },
};

module.exports = PasswordsService;
