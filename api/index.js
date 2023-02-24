require('dotenv').config();
const initApp = require('./init/initApp');
const env = process.env;
const initDb = env.INIT_DB === 'true';
const express = require('express');
const app = express();
const port = process.env.PORT || 3100;
const corsAppOrigin = process.env.APP_ORIGIN;

global.requireWrapper = name => {
  return require(__dirname + '/' + name);
}

var cookieParser = require('cookie-parser');

const apiV1 = require('./src/routes/v1');
const apiV2 = require('./src/routes/v2');

const verifyToken = require('./src/middleware/auth.middleware')

app.use(express.json()); // parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

const cors = require('cors');
var corsOptions = {
  origin: corsAppOrigin ? corsAppOrigin : 'http://localhost:3000', // URL of the frontend
  credentials: true
};

console.log(corsAppOrigin, corsOptions);

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({ message: 'ok' });
});

app.use('/api/v1', verifyToken, apiV1);
app.use('/api/v2', verifyToken, apiV2);

const db = require('./src/app/model');
db.sequelize.sync({ force: initDb }).then(res => initApp());

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
