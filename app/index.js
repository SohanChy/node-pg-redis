'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

// app.disable('x-powered-by')
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  res.setHeader('X-Powered-By', 'Blood Sweat & Tears');

  console.log(req.path,req.url,req.originalUrl);
  next();
});

app.use(require('./routes/maintenance'));

//v1 ROUTES HERE
app.use("/v1",require('./routes/v1/sc_routes'))


app.use(require('./middleware/error_middleware').all)

module.exports = app
