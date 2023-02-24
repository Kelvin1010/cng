module.exports = (sequelize, Sequelize) =>
  sequelize.define('Vehicle', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    capacity: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    type: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    busySlots: {
      type: Sequelize.STRING,
    },
    
  });
