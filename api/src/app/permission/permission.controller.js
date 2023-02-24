const permissionService = require('./permission.service');

async function getAll(req, res, next) {
  try {
    res.json(await permissionService.getAll());
  } catch (err) {
    console.error(`Error while getting permissions`, err.message);
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const id = req.params.id;
    res.json(await permissionService.getById(id));
  } catch (err) {
    console.error(`Error while getting member by id`, err.message);
    next(err);
  }
}

module.exports = {
  getAll,
  getById,
};
