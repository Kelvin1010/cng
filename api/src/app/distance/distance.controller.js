const distanceService = require('./distance.service');

async function get(req, res, next) {
  try {
    const { page, pageSize, ...filterSpec } = req.query ? req.query : {};

    const result = await distanceService.getMultiple(filterSpec, page, pageSize);
    res.json(result);
  } catch (err) {
    console.error(`Error while getting tags`, err.message);
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const id = req.params.id;
    res.json(await distanceService.getById(id));
  } catch (err) {
    console.error(`Error while getting tag by id`, err.message);
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const data = req.body;
    res.json(await distanceService.create(data));
  } catch (err) {
    console.error(`Error while creating a tag`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    res.json(await distanceService.update(id, data));
  } catch (err) {
    console.error(`Error while updating tag`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = req.params.id;
    res.json(await distanceService.remove(id));
  } catch (err) {
    console.error(`Error while deleting tag`, err.message);
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
