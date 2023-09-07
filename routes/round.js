


const express = require('express');
const router = express.Router();
const roundsCtrl = require('../controllers/roundController.js')

router.get('/', roundsCtrl.index)
router.post('/', roundsCtrl.create)

module.exports = router;