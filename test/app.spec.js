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
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("prep tables before each test", () => {
    db.raw("TRUNCATE users, passwords RESTART IDENTITY CASCADE");
  });

  describe("POST api/users/register", () => {
    context("users table is empty, user will be added", () => {
      const testUser = makeUsers();
      return supertest(app)
        .post("/api/users/register", testUser)
        .expect(201, "user added");
    });
  });
});
