const { expect } = require("chai");
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");

const { makeUsers, makePasswords } = require("./app.fixtures");

describe("Users Endpoints", () => {
  let db;
  before("make knex instance to simulate server", () => {
    db = knex({
      client: "pg",
      connection: `postgresql://dunder_mifflin@localhost/you-shall-not-password-test`,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("prep tables before each test", () => {
    db.raw("TRUNCATE users, passwords RESTART IDENTITY CASCADE");
  });

  describe("POST api/users/register", () => {
    it("responds with 201 and user added", () => {
      const testUser = makeUsers();
      return supertest(app)
        .post("http://localhost:8000/api/users/register", testUser[0])
        .expect(201, "user added");
    });
  });
});
