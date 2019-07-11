'use strict';

var router = require('express').Router();

var _require = require('../../helpers/helpers'),
    wrap = _require.wrap;

var _require2 = require('../../controllers/v1/sc_controller'),
    lockCardTemporarily = _require2.lockCardTemporarily,
    unlockCard = _require2.unlockCard;

router.route('/lock-temporary/:card_no').put(wrap(lockCardTemporarily));
router.route('/unlock/:card_no')["delete"](wrap(unlockCard));
module.exports = router;
//# sourceMappingURL=sc_routes.js.map