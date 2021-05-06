const UsersService = {
  getAllUsers(knex) {
    return knex.select("*").from("users");
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
    return knex.from("users").select("*").where({ email }).first();
  },

  deleteUser(knex, id) {
    return knex("users").delete(id);
  },

  updateUser(knex, id, newUserFields) {
    return knex("users").where({ id }).update(newUserFields);
  },
};

module.exports = UsersService;