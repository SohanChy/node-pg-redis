#!/usr/bin/env node
'use strict';

var PORT = process.env.PORT || 3000;

var app = require('../app');

app.listen(PORT, function () {
  console.log("Server started on port ".concat(PORT));
}).on('error', function (err) {
  console.log('ERROR: ', err);
});
//# sourceMappingURL=start.js.map