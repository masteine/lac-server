const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("lac_db", "postgres", "root", {
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialect: "postgres",
  host: "localhost",
  port: 5432
});

export default sequelize;
