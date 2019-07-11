'use strict';

require("core-js/modules/es6.date.now");

var router = require('express').Router();

router.get('/ping', function (req, res, next) {
  res.json({
    ping: "pong",
    message: 'Service Reachable',
    timestamp: Date.now()
  });
  console.log("pinged");
});
router.get('/ping/:word/toping', function (req, res, next) {
  res.json({
    ping: "pong",
    message: 'Service Reachable',
    data: req.params,
    timestamp: Date.now()
  });
  console.log("pinged");
});
module.exports = router;
//# sourceMappingURL=maintenance.js.map