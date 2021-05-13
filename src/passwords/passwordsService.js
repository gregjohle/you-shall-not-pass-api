const xss = require("xss");
const environment = process.env.NODE_ENV || "development";
const configuration = require("../database")[environment];
const database = require("knex")(configuration);

const PasswordsService = {
  getAllPasswords(knex, user_id) {
    return database.from("passwords").select("*").where({ user_id });
  },
  insertPassword(knex, newPassword) {
    return database
      .into("passwords")
      .insert(newPassword)
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  deletePassword(knex, id) {
    return database("passwords").where({ id }).delete();
  },
  updatePassword(knex, id, newPasswordFields) {
    return database("notes").where({ id }).update(newPasswordFields);
  },
};

module.exports = PasswordsService;
