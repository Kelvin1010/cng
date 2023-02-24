const Vendor = require('../model').vendor;
const helper = require('../core/utils/helper.util');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

async function getMultiple(filterSpec = null, page = null, pageSize = null) {
  let meta = null;
  const params = {};
  if (filterSpec) {
    let searchString = filterSpec['search'];
    delete filterSpec['search'];

    params.where = searchString
      ? {
          ...filterSpec,
          [Op.or]: [
            { name: { [Op.like]: `%${searchString}%` } },
            { description: { [Op.like]: `%${searchString}%` } },
          ],
        }
      : filterSpec;
  }
  if (page && pageSize) {
    const offset = helper.getOffset(page, pageSize);
    params.limit = pageSize;
    params.offset = offset;
    meta = { page };
  }
  const rows = await Vendor.findAll(params);
  var data = helper.emptyOrRows(rows);

  return { payload: data, meta };
}

async function getById(id) {
  var result = await Vendor.findByPk(id);
  return result;
}

async function create(prop) {
  var result = await Vendor.create(prop);
  return {
    success: result ? true : false,
    payload: result,
  };
}

async function update(id, tag) {
  const result = await Vendor.update(tag, { where: { id } });
  return {
    success: result[0] > 0 ? true : false,
  };
}

async function remove(id) {
  const result = await Vendor.destroy({ where: { id } });
  return {
    success: result > 0 ? true : false,
  };
}

module.exports = {
  getMultiple,
  getById,
  create,
  update,
  remove,
};
