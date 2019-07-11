'use strict'

const router = require('express').Router();
const { wrap } = require('../../helpers/helpers');

const {
  lockCardTemporarily,
  unlockCard
} = require('../../controllers/v1/sc_controller');

router.route('/lock-temporary/:card_no').put(wrap(lockCardTemporarily));
router.route('/unlock/:card_no').delete(wrap(unlockCard));


module.exports = router