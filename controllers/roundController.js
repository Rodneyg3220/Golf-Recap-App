const Round = require('../models/round')
const mongoose = require('mongoose')

module.exports = {
    index,
    create,
    delete: deleteRounds,
    findById,
    update
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

async function findById(req, res) {
    const edit = await Edit.findById(req.params.id);
    res.status(200).json(edit)
}

async function update(req, res) {
    try {
        const roundId = req.params.id;
        const updateData = req.body;

        // Use findByIdAndUpdate to update the round
        const updatedRound = await Round.findByIdAndUpdate(roundId, updateData, {
            new: true, // Return the updated round, not the original one
        });

        if (!updatedRound) {
            return res.status(404).json({ message: 'Round not found' });
        }

        res.status(200).json(updatedRound);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

    