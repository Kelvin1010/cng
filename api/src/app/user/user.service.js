const jwt = require('jsonwebtoken');
var passwdGenerator = require('generate-password');

const User = require('../model').user;
const helper = require('../core/utils/helper.util');
const pwdUtil = require('../core/utils/pwd.util');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

async function getMultiple(filterSpec = null, page = null, pageSize = null) {
  let meta = null;
  const params = {};//include: ['user', 'project', 'role']
  if (filterSpec) {
    let searchString = filterSpec['search'];
    delete filterSpec['search'];
    if (searchString) {
      filterSpec['fullName'] = { [Op.like]: `%${searchString}%` }
    }
    params.where = filterSpec;
  }
  if (page && pageSize) {
    const offset = helper.getOffset(page, pageSize);
    params.limit = pageSize;
    params.offset = offset;
    meta = { page };
  }

  const rows = await User.findAll(params);
  const data = helper.emptyOrRows(rows);

  return { payload: data, meta };
}

async function getById(id) {
  const result = await User.findByPk(id);
  return result;
}

async function getByUsername(username) {
  const result = await User.findOne({where: {username}});
  return result;
}

async function signUp(user) {
  // Validate user information
  if (!user.fullName) {
    return {
      success: false,
      error: {
        code: 'FULL_NAME_REQUIRED',
        msg: 'Full name is required.',
      },
    };
  }

  if (!user.username) {
    return {
      success: false,
      error: {
        code: 'USERNAME_REQUIRED',
        msg: 'Username is required.',
      },
    };
  }

  let exists = await _checkUsernameExists(user.username);
  if (exists) {
    return {
      success: false,
      error: {
        code: 'USERNAME_ALREADY_EXISTS',
        msg: 'Username already exists.',
      },
    };
  }

  if (!user.email) {
    return {
      success: false,
      error: {
        code: 'EMAIL_REQUIRED',
        msg: 'Email is required.',
      },
    };
  }

  exists = await _checkEmailExists(user.email);
  if (exists) {
    return {
      success: false,
      error: {
        code: 'EMAIL_ALREADY_EXISTS',
        msg: 'Email already exists.',
      },
    };
  }

  if (!user.passwd) {
    return {
      success: false,
      error: {
        code: 'PASSWD_REQUIRED',
        msg: 'Password is required.',
      },
    };
  }

  // Hash password
  user.hashPasswd = pwdUtil.hashSync(user.passwd);

  const result = await User.create(user);

  return {
    success: result ? true : false,
    payload: result,
  };
}

async function _checkUsernameExists(username) {
  const result = await User.findOne({ where: { username } });
  return result !== null;
}

async function _checkEmailExists(email) {
  const result = await User.findOne({ where: { email } });
  return result !== null;
}

async function signIn(username, passwd) {
  var user = await User.findOne({ where: { username }, include: ['role'] });
  if (!user) {
    return {
      success: false,
      error: {
        code: 'USERNAME_NOT_EXISTS',
        msg: 'Username does not exist.',
      },
    };
  }
  if (!pwdUtil.compareSync(passwd, user.hashPasswd)) {
    return {
      success: false,
      error: {
        code: 'WRONG_PASSWD',
        msg: 'Wrong password.',
      },
    };
  }
  if (!user.active) {
    return {
      success: false,
      error: {
        code: 'ACCOUNT_INACTIVE',
        msg: 'Your account is inactive. Please wait for the Admin to activate your account.',
      },
    };
  }

  const resUser = {
    username: user.username,
    email: user.email,
    id: user.id,
    role: user.role,
    isAdmin: user.role.normName === 'admin'
  };
  resUser.token = jwt.sign(
    resUser,
    process.env.API_SECRET, 
    { expiresIn: '1day' }
  );
  return {
    success: true,
    payload: resUser,
  };
}

async function activeUser(id) {
  var user = await User.findOne({ where: { id } });
  if (!user) {
    throw new Error('User does not exist.');
  }
  if (user.active) {
    throw new Error('User has been activated.');
  }

  const result = await User.update({ active: true }, { where: { id } });
  return {
    success: result[0] > 0 ? true : false,
  };
}

async function deactiveUser(id) {
  var user = await User.findOne({ where: { id } });
  if (!user) {
    throw new Error('User does not exist.');
  }
  if (!user.active) {
    throw new Error('User has been deactivated.');
  }

  const result = await User.update({ active: false }, { where: { id } });
  return {
    success: result[0] > 0 ? true : false,
  };
}

async function changePasswd(id, currPasswd, newPasswd) {
  var user = await User.findOne({ where: { id } });
  if (!user) {
    throw new Error('User does not exist.');
  }
  if (!pwdUtil.compareSync(currPasswd, user.hashPasswd)) {
    throw new Error('Wrong current password.');
  }

  const hashPasswd = pwdUtil.hashSync(newPasswd);
  const result = await User.update({ hashPasswd }, { where: { id } });
  return {
    success: result[0] > 0 ? true : false,
  };
}

async function resetPasswd(id) {
  var user = await User.findOne({ where: { id } });
  if (!user) {
    throw new Error('User does not exist.');
  }

  const newPasswd = passwdGenerator.generate({ numbers: true });
  const hashPasswd = pwdUtil.hashSync(newPasswd);
  const result = await User.update({ hashPasswd }, { where: { id } });
  return {
    success: result[0] > 0 ? true : false,
    payload: newPasswd,
  };
}

async function update(id, user) {
  console.log(id, user);
  if (user.hasOwnProperty('username')) {
    const existedUsername = await User.findOne({ where: { username: user.username } });
    if (!existedUsername || existedUsername?.id != id){
      console.log(existedUsername);
      return {
        success: false,
        // error: {
        //   code: 'USERNAME_ALREADY_EXISTS',
        //   msg: 'Username already exists.',
        // },
        error: {
          code: 'USERNAME_NOT_ALLOW_EDIT',
          msg: 'Username is not allow to edit.',
        },
      };
    }
    // throw new Error('Username is not allow to edit.');
  }
  if (user.hasOwnProperty('email')) {
    const existedEmail = await User.findOne({ where: { email: user.email } });
    if (existedEmail && existedEmail.id != id) {
      console.log(existedEmail);
      return {
        success: false,
        error: {
          code: 'EMAIL_ALREADY_EXISTS',
          msg: 'Email already exists.',
        },
        // error: {
        //   code: 'EMAIL_NOT_ALLOW_EDIT',
        //   msg: 'Email is not allow to edit.',
        // },
      };
    }
    // throw new Error('Email is not allow to edit.');
  }
  if (user.hasOwnProperty('passwd')) {
    throw new Error('Password is not allow to edit.');
  }
  console.log(user);
  const result = await User.update(user, { where: { id } });
  return {
    success: result[0] > 0 ? true : false,
  };
}

async function remove(id) {
  const result = await User.destroy({ where: { id } });
  return {
    success: result > 0 ? true : false,
  };
}

module.exports = {
  getMultiple,
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
