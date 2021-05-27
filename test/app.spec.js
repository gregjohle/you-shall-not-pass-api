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

  beforeEach("prep tables before each test", () => {
    db.raw("TRUNCATE users, passwords RESTART IDENTITY CASCADE");
  });

  afterEach("prep tables after each test", () => {
    db.raw("TRUNCATE users, passwords RESTART IDENTITY CASCADE");
  });

  describe("POST api/users/register", () => {
    it("responds with 201 and user added", () => {
      const testUser = makeUsers();
      return supertest(app)
        .post("/api/users/register")
        .send(testUser[0])
        .expect(201, "user added");
    });
  });

  describe("POST /api/users/login", () => {
    it("responds with user Data", () => {
      const testUser = makeUsers();
      const existingUser = {
        name: testUser[0].name,
        email: testUser[0].email,
      };

      return supertest(app)
        .post("/api/users/login")
        .send(testUser[0])
        .expect(200)
        .expect((res) => {
          expect(res.body.name).to.eql(existingUser.name);
          expect(res.body.email).to.eql(existingUser.email);
        });
    });
  });

  describe("POST /api/passwords/add", () => {
    it("adds the password and responds with 200 and password", () => {
      const testPasswords = makePasswords();
      const addedPassword = {
        username: testPasswords[0].username,
        site: testPasswords[0].site,
        password: testPasswords[0].password,
        user_id: testPasswords[0].user_id,
      };

      return supertest(app)
        .post("/api/passwords/add")
        .send(testPasswords[0])
        .expect(200)
        .expect((res) => {
          console.log(res);
          expect(res.body.username).to.eql(addedPassword.username);
          expect(res.body.site).to.eql(addedPassword.site);
          expect(res.body.password).to.eql(addedPassword.password);
          expect(res.body.user_id).to.eql(addedPassword.user_id);
        });
    });
  });
});
