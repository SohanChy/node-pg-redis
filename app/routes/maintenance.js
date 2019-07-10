'use strict'

const router = require('express').Router()

router.get('/ping', (req, res, next) => {
  res.json({
    ping: "pong",
    message: 'Service Reachable',
    timestamp: Date.now()
  });

  console.log("pinged");
})

router.get('/ping/:word/toping', (req, res, next) => {
  res.json({
    ping: "pong",
    message: 'Service Reachable',
    data: req.params,
    timestamp: Date.now()
  });

  console.log("pinged");
})


module.exports = router
