const { expect } = require("chai");
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const bcrypt = require("bcryptjs");

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

  afterEach("prep tables after each test", async () => {
    await db.raw("TRUNCATE users, passwords RESTART IDENTITY CASCADE");
  });

  describe("POST api/users/register", () => {
    context("user not in table", () => {
      const testUser = makeUsers();
      it("responds with 201 and user added", () => {
        return supertest(app)
          .post("/api/users/register")
          .send(testUser[0])
          .expect(201, "user added");
      });
    });

    context("User exists already", () => {
      const testUser = makeUsers();
      const insertUser = {
        name: testUser[0].name,
        email: testUser[0].email,
        password: bcrypt.hashSync("test", 10),
      };

      before("insert user", async () => {
        await db.into("users").insert(insertUser);
      });

      it("responds 200 and user exists", () => {
        return supertest(app)
          .post("/api/users/register")
          .send(testUser[0])
          .expect(200, "A User already exists with that email.");
      });
    });
  });

  describe("POST /api/users/login", () => {
    context("user does not exist", () => {
      const testUser = makeUsers();

      it("responds 404 user not found", () => {
        return supertest(app)
          .post("/api/users/login")
          .send(testUser[0])
          .expect(404, "No User found.");
      });
    });

    context("user exists", () => {
      const testUser = makeUsers();
      const insertUser = {
        name: testUser[0].name,
        email: testUser[0].email,
        password: bcrypt.hashSync("test", 10),
      };

      beforeEach("insert user", async () => {
        await db.into("users").insert(insertUser);
      });

      it("responds with wrong password", () => {
        let userInfo = {
          email: testUser[0].email,
          password: "Wrong",
        };

        return supertest(app)
          .post("/api/users/login")
          .send(userInfo)
          .expect(401, "Invalid Password");
      });

      it("responds with user Data", () => {
        const existingUser = {
          password: testUser[0].password,
          email: testUser[0].email,
        };

        return supertest(app)
          .post("/api/users/login")
          .send(testUser[0])
          .expect(200);
      });
    });
  });

  describe("POST /api/passwords/add", () => {
    context("adds a password to the database", () => {
      const testPasswords = makePasswords();
      const addedPassword = {
        username: testPasswords[0].username,
        site: testPasswords[0].site,
        password: testPasswords[0].password,
      };

      it("adds the password and responds with 200 and password", () => {
        return supertest(app)
          .post("/api/passwords/add")
          .send(addedPassword)
          .expect(200)
          .expect((res) => {
            console.log(res.body);
            expect(res.body.password.username).to.equal(addedPassword.username);
            expect(res.body.password.site).to.equal(addedPassword.site);
          });
      });
    });

    it("it deletes a password", () => {
      const testPasswords = makePasswords();
      const addedPassword = {
        username: testPasswords[0].username,
        site: testPasswords[0].site,
        password: testPasswords[0].password,
      };

      return supertest(app)
        .post("/api/passwords/add")
        .send(addedPassword)
        .then((res) => {
          let passwordInfo = res.body;

          supertest(app)
            .post("/api/passwords/delete")
            .send(passwordInfo.password.id)
            .expect(200);
        });
    });
  });
});
