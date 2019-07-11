
const router = require('express').Router()

router.use('/cards', require('./sc_routes'));

module.exports = router;