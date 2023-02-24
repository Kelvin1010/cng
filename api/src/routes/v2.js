const express = require('express');
const router = express.Router();

const uploadRouter = require('../app/core/upload/upload.route')

const roleRouter = require('../app/role/role.route');
const usersRouter = require('../app/user/user.route');
const permissionRouter = require('../app/permission/permission.route');

const vehicleRouter = require('../app/vehicle/vehicle.route');
const customerRouter = require('../app/customer/customer.route');
const requestRouter = require('../app/request/request.route');
const pointRouter = require('../app/point/point.route');
const distanceRouter = require('../app/distance/distance.route');
const driverRouter = require('../app/driver/driver.route');
const vendorRouter = require('../app/vendor/vendor.route');

router.use('/roles', roleRouter);
router.use('/users', usersRouter);
router.use('/permissions', permissionRouter);

router.use('/vehicles', vehicleRouter);
router.use('/customers', customerRouter);
router.use('/requests', requestRouter);
router.use('/points', pointRouter);
router.use('/distances', distanceRouter);
router.use('/drivers', driverRouter);
router.use('/vendors', vendorRouter);

module.exports = router;
