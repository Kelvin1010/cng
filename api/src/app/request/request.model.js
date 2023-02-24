module.exports = (sequelize, Sequelize) =>
  sequelize.define('Request', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    demand: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    erliestTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    latestTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    requestTime: {
      type: Sequelize.DATE,
    },
  });
