const _userService = require('./user.service');

async function get(req, res, next) {
  try {
    let filterSpec = {};
    filterSpec = { ...req.query };
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    res.json(await _userService.getMultiple(filterSpec, page, pageSize));
  } catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const id = req.params.id;
    res.json(await _userService.getById(id));
  } catch (err) {
    console.error(`Error while getting user by id`, err.message);
    next(err);
  }
}

async function getByUsername(req, res, next) {
  try {
    const username = req.params.username;
    res.json(await _userService.getByUsername(username));
  } catch (err) {
    console.error(`Error while getting user by id`, err.message);
    next(err);
  }
}

async function signUp(req, res, next) {
  try {
    const user = req.body;
    res.json(await _userService.signUp(user));
  } catch (err) {
    console.error(`Error while registering user`, err.message);
    next(err);
  }
}

async function signIn(req, res, next) {
  try {
    const username = req.body.username;
    const passwd = req.body.passwd;
    const result = await _userService.signIn(username, passwd);
    res.cookie('TOKEN', result?.payload?.token);
    res.json(result);
  } catch (err) {
    console.error(`Error while signing user`, err.message);
    next(err);
  }
}

async function activeUser(req, res, next) {
  try {
    const id = req.params.id;
    res.json(await _userService.activeUser(id));
  } catch (err) {
    console.error(`Error while activating user`, err.message);
    next(err);
  }
}

async function deactiveUser(req, res, next) {
  try {
    const id = req.params.id;
    res.json(await _userService.deactiveUser(id));
  } catch (err) {
    console.error(`Error while deactivating user`, err.message);
    next(err);
  }
}

async function changePasswd(req, res, next) {
  try {
    const id = req.params.id;
    const currPasswd = req.body.currPasswd;
    const newPasswd = req.body.newPasswd;
    res.json(await _userService.changePasswd(id, currPasswd, newPasswd));
  } catch (err) {
    console.error(`Error while updating the password`, err.message);
    next(err);
  }
}

async function resetPasswd(req, res, next) {
  try {
    const id = req.params.id;
    res.json(await _userService.resetPasswd(id));
  } catch (err) {
    console.error(`Error while resetting the password`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const id = req.params.id;
    const user = req.body;
    res.json(await _userService.update(id, user));
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = req.params.id;
    res.json(await _userService.remove(id));
  } catch (err) {
    console.error(`Error while deleting user`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  getById,
  signUp,
  signIn,
  activeUser,
  deactiveUser,
  changePasswd,
  resetPasswd,
  update,
  remove,
  getByUsername
};
