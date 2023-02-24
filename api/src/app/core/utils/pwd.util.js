const bcrypt = require('bcrypt');

function hashSync(plainText) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(plainText, salt);
}

function compareSync(plainText, hash) {
  return bcrypt.compareSync(plainText, hash);
}

module.exports = {
  hashSync,
  compareSync,
};
