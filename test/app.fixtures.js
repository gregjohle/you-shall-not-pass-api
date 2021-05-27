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
      user_id: "1a09ae47-b807-476b-85e0-d983548bd36b",
    },
    {
      username: "uname",
      site: "site2",
      password: "password",
      user_id: "1a09ae47-b807-476b-85e0-d983548bd36b",
    },
  ];
}

module.exports = {
  makeUsers,
  makePasswords,
};
