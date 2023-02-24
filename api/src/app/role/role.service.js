const Role = require('../model').role;
const { normalize } = require('../core/utils/str.util');
const helper = require('../core/utils/helper.util');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

async function getMultiple(filterSpec = null, page = null, pageSize = null) {
  let meta = null;
  const params = { include: ['users'] };
  if (filterSpec) {
    let searchString = filterSpec['search'];
    delete filterSpec['search'];
    if (searchString) {
      filterSpec['name'] = { [Op.like]: `%${searchString}%` }
    }
    params.where = filterSpec;
  }
  if (page && pageSize) {
    const offset = helper.getOffset(page, pageSize);
    params.limit = pageSize;
    params.offset = offset;
    meta = { page };
  }

  const rows = await Role.findAll(params);
  const data = helper.emptyOrRows(rows);
  const res = data.map(e => {
    e.permissions = e.permissions ? JSON.parse(e.permissions) : e.permissions;
    return e;
  })

  return { payload: res, meta };
}

async function getById(id) {
  const result = await Role.findByPk(id);
  return result;
}

// async function getAllByUserId(id){
//   const params = {
//     where: { userId : id}
//   }
// }

async function create(role) {
  role.normName = normalize(role.name);
  role.permissions = role.permissions ? JSON.stringify(role.permissions) : null;
  const result = await Role.create(role);
  return {
    success: result ? true : false,
    payload: result,
  };
}

async function update(id, role) {
  role.normName = normalize(role.name);
  role.permissions = role.permissions ? JSON.stringify(role.permissions) : null;
  const result = await Role.update(role, { where: { id } });
  return {
    success: result[0] > 0 ? true : false,
  };
}

async function remove(id) {
  const result = await Role.destroy({ where: { id } });
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
