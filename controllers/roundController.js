const Round = require('../models/round')
const mongoose = require('mongoose')

module.exports = {
    index,
    create,
    delete: deleteRounds,
    
}

async function deleteRounds(req, res) {
    const round = await Round.findById(req.params.id);
    await Round.findByIdAndDelete(round._id);
    res.status(201).json(round);
    
};

async function index(req, res) {
    const rounds = await Round.find({})
    res.json(rounds);
}

async function create(req, res) {
    const round = await Round.create(req.body);
    res.status(201).json(round);
}