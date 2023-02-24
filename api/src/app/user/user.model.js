module.exports = (sequelize, Sequelize) =>
  sequelize.define('User', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    hashPasswd: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    avatarUrl: {
      type: Sequelize.STRING,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
