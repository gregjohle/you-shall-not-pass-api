function makeUsers() {
  return [
    {
      name: "Greg",
      email: "greg@email.com",
      password: "test",
    },
    {
      name: "Gerg",
      email: "gerg@email.com",
      password: "test",
    },
  ];
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
