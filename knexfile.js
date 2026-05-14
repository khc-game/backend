export default {
  development: {
    client: "mysql2",
    connection: {
      database: "strategy_game",
      user: "root",
      password: "",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
