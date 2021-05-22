const environment = process.env.NODE_ENV || "development";

const PasswordsService = {
  // Gets all passwords from a single user
  getAllPasswords(knex, user_id) {
    return knex.from("passwords").select("*").where({ user_id });
  },

  // adds a password for a specified user
  insertPassword(knex, newPassword) {
    return knex
      .into("passwords")
      .insert(newPassword)
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },

  // Delete's a password
  deletePassword(knex, id) {
    console.log(id);
    return knex.from("passwords").where({ id }).delete();
  },

  // allows the user to update a password if they change something
  updatePassword(knex, id, newPasswordFields) {
    return knex("notes").where({ id }).update(newPasswordFields);
  },
};

module.exports = PasswordsService;
