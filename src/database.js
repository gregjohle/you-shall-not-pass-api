module.exports = {
  development: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true, {
        rejectUnauthorized: false,
      }
    },
    migrations: {
      directory: "../migrations",
    },
    // useNullAsDefault: true,
  },

  // production: {
  //   client: "pg",
  //   connection: {
  //     connectionString: process.env.DATABASE_URL,
  //     ssl: { rejectUnauthorized: false },
  //   },
  //   migrations: {
  //     directory: "./migrations",
  //   },
  //   useNullAsDefault: true,
  // },
};
