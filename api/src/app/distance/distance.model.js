module.exports = (sequelize, Sequelize) =>
  sequelize.define('Distance', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    length: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    timeToTravel: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
  });
