const db = require('../core/service/db.service');

db.role = require('../role/role.model')(db.sequelize, db.Sequelize);
db.user = require('../user/user.model')(db.sequelize, db.Sequelize);

db.user.belongsTo(db.role, {
  sourceKey: 'id',
  foreignKey: 'roleId',
  as: 'role',
});

db.role.hasMany(db.user, {
  sourceKey: 'id',
  foreignKey: 'roleId',
  as: 'users',
});

db.vehicle = require('../vehicle/vehicle.model')(db.sequelize, db.Sequelize);

db.customer = require('../customer/customer.model')(db.sequelize, db.Sequelize);

db.distance = require('../distance/distance.model')(db.sequelize, db.Sequelize);

db.driver = require('../driver/driver.model')(db.sequelize, db.Sequelize);

db.point = require('../point/point.model')(db.sequelize, db.Sequelize);

db.request = require('../request/request.model')(db.sequelize, db.Sequelize);

db.vendor = require('../vendor/vendor.model')(db.sequelize, db.Sequelize);

db.vehicle.belongsTo(db.point, {
  sourceKey: 'id',
  foreignKey: 'pointId',
  as: 'currentPosition',
});

db.customer.belongsTo(db.point, {
  sourceKey: 'id',
  foreignKey: 'pointId',
  as: 'position',
});

db.distance.belongsTo(db.point, {
  sourceKey: 'id',
  foreignKey: 'fromPointId',
  as: 'from',
});

db.distance.belongsTo(db.point, {
  sourceKey: 'id',
  foreignKey: 'toPointId',
  as: 'to',
});

db.vendor.belongsTo(db.point, {
  sourceKey: 'id',
  foreignKey: 'pointId',
  as: 'position',
});

db.request.belongsTo(db.customer, {
  sourceKey: 'id',
  foreignKey: 'customerId',
  as: 'customer',
});

db.customer.hasMany(db.request, {
  sourceKey: 'id',
  foreignKey: 'customerId',
  as: 'requests',
});

module.exports = db;
