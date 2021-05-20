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
