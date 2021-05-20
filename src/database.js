module.exports = {
  development: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    },
    migrations: {
      directory: "../migrations",
    },
    useNullAsDefault: true,
  },

  test: {
    client: "pg",
    connection: process.env.TEST_DATABASE_URL,
    migrations: {
      directory: "./migrations",
    },
    useNullAsDefault: true,
  },
  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    },
    migrations: {
      directory: "./migrations",
    },
    useNullAsDefault: true,
  },
};
