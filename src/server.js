const knex = require("knex");
const app = require("./app");

const { PORT } = require("./config");

const db = knex({
  client: "pg",
  connection: {
    connection: process.env.DATABASE_URL,
    // ssl: true,
    ssl: { rejectUnauthorized: false },
  },
});

app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
