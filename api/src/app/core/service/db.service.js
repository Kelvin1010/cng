const dbConfig = require('../../../config/db.config');

const Sequelize = require("sequelize");

// const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
//   host: dbConfig.host,
//   dialect: 'mysql',
//   operatorsAliases: false,

//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   }
// });

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'data/database.db'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;