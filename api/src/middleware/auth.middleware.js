const jwt = require("jsonwebtoken");
const User = require('../app/model').user;

const verifyToken = (req, res, next) => {
  if (req.url == '/users/sign_in' || req.url == '/users/sign_up') { //|| (req.url.startsWith('/projects/')) && req.url.includes('/images/')
    next();
    return;
  }

  var token = req.cookies?.TOKEN;
  if (!token) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      token = req.headers.authorization.split(' ')[1];
    }
  }

  // if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
  if (token) {
    // jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
    jwt.verify(token, process.env.API_SECRET, function (err, decode) {
      if (err || !decode) {
        req.user = undefined;
        res.status(401)
          .send({
            message: err || 'Invalid token'
          });
      }
      else User.findOne({ where: { username: decode.username } })
        .then((resp) => {
          const user = resp?.dataValues ? resp.dataValues : {};
          const ne_err = user.active != true;
          if (user === {}) {
            res.status(401)
              .send({
                message: 'Unauthorised access'
              });
          } else if (ne_err) {
            res.status(403)
              .send({
                message: 'The user has been Inactivate'
              });
          } else {
            req.user = user;
            next();
          }
        })
    });
  } else {
    req.user = undefined;
    res.status(401)
      .send({
        message: 'Unauthorised access'
      });
    // next();
  }
};
module.exports = verifyToken;