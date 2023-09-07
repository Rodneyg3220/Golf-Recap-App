const Round = require('../models/round')
const mongoose = require('mongoose')

module.exports = {
    index,
    create
};

async function index(req, res) {
    const rounds = await Round.find({})
    res.json(rounds);
}

async function create(req, res) {
    const round = await Round.create(req.body);
    res.status(201).json(round);
}