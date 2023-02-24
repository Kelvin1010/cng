module.exports = (sequelize, Sequelize) =>
  sequelize.define('Vendor', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    avgProductivity: {
      type: Sequelize.NUMBER,
    },
    maxVehiclePerTime: {
      type: Sequelize.NUMBER,
    },
    avgLoadingTimePerVehicle: {
      type: Sequelize.NUMBER,
    },
    avgLoadingTimePerM3: {
      type: Sequelize.NUMBER,
    },
  });
