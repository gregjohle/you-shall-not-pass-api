function makeUsers() {
  return {
    name: "Greg",
    email: "greg@email.com",
    password: "test",
    id: 1,
  };
}

function makePasswords() {
  return [
    {
      username: "username",
      site: "site",
      password: "password",
      user_id: 1,
    },
    {
      username: "uname",
      site: "site2",
      password: "password",
      user_id: 1,
    },
  ];
}

module.exports = {
  makeUsers,
  makePasswords,
};
