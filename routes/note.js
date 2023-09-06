import express from 'express';


const express = require('express');
const router = express.Router();
const notesCtrl = require('../controllers/noteController')

router.get('/', notesCtrl.index)
router.post('/', notesCtrl.create)

export default router;