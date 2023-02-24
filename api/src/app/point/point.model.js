module.exports = (sequelize, Sequelize) =>
  sequelize.define('Point', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lon: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lat: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
