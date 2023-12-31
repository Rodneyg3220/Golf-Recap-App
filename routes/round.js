const express = require('express');
const router = express.Router();
const roundsCtrl = require('../controllers/roundController.js')

router.get('/', roundsCtrl.index)
router.post('/', roundsCtrl.create)
router.delete('/:id', roundsCtrl.delete)
router.get('/:id', roundsCtrl.findById)
router.put('/:id', roundsCtrl.update)
module.exports = router;