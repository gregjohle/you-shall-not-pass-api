require("dotenv").config();

module.exports = {
  migrationsDirectory: "./src/migrations",
  driver: "pg",
  connectionString: process.env.DATABASE_URL,
};
