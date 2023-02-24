const roleService = require('./role.service');

async function get(req, res, next) {
  try {
    const { page, pageSize, ...filterSpec } = req.query ? req.query : {};

    res.json(await roleService.getMultiple(filterSpec, page, pageSize));
  } catch (err) {
    console.error(`Error while getting members`, err.message);
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const id = req.params.id;
    res.json(await roleService.getById(id));
  } catch (err) {
    console.error(`Error while getting member by id`, err.message);
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const creatorId = req.user.id;
    const role = req.body;
    role.creatorId = creatorId;
    res.json(await roleService.create(role));
  } catch (err) {
    console.error(`Error while creating a role`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const id = req.params.id;
    const role = req.body;
    res.json(await roleService.update(id, role));
  } catch (err) {
    console.error(`Error while updating member`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = req.params.id;
    res.json(await roleService.remove(id));
  } catch (err) {
    console.error(`Error while deleting member`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
