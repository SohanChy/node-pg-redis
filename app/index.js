'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const morgan  = require('morgan')

const app = express()

app.use(bodyParser.json())
app.use(morgan(process.env.ENV === 'development' ? 'dev':'combined'))

// app.disable('x-powered-by')
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  res.setHeader('X-Powered-By', 'Blood Sweat & Tears');

  // console.log(req.path,req.url,req.originalUrl);
  next();
});

app.use(require('./routes/maintenance'));

//v1 ROUTES HERE
app.use("/core-v3",require('./routes/core-v3/core-v3'))
app.use("/v1",require('./routes/v1/v1'))


app.use(require('./middleware/error_middleware').all)

module.exports = app
