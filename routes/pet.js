const router = require('express').Router();
const ctrl = require('../controllers');

router.get('/test', ctrl.pet.test);
router.get('/pet', ctrl.pet.index);


module.exports = router;