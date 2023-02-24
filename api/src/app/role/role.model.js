module.exports = (sequelize, Sequelize) =>
  sequelize.define('Role', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    normName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // type: 0 => system roles, 1 => project roles
    type: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    permissions: {
      type: Sequelize.STRING
    }
  });
