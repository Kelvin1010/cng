const userService = require('../src/app/user/user.service');
const roleService = require('../src/app/role/role.service');

const fs = require('fs');

const initApp = async () => {
  const defaultAdminFilePath = './init/defaultAdminUser.json';
  if (fs.existsSync(defaultAdminFilePath)) {
    await roleService.create({ id: 1, name: 'User', active: true });
    await roleService.create({ id: 2, name: 'Admin', active: true });

    const adminUser = require('./defaultAdminUser.json');
    await userService.signUp(adminUser);
    fs.unlinkSync(defaultAdminFilePath);
  }
}

module.exports = initApp;