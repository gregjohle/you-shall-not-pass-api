module.exports = {
  development: {
    client: "pg",
    connection: {
      connectionString: DATABASE_URL,
      ssl: true,
    },
    migrations: {
      directory: "../migrations",
    },
    useNullAsDefault: true,
  },

  test: {
    client: "pg",
    connection: TEST_DATABASE_URL,
    migrations: {
      directory: "./migrations",
    },
    useNullAsDefault: true,
  },
  production: {
    client: "pg",
    connection: {
      connectionString: DATABASE_URL,
      ssl: true,
    },
    migrations: {
      directory: "./migrations",
    },
    useNullAsDefault: true,
  },
};
