const Note = require('../models/note')
const mongoose = require('mongoose')

module.exports = {
    index,
    create
};

async function index(req, res) {
    const notes = await Note.find({})
    res.json(notes);
}

async function create(req, res) {
    const note = await Note.create(req.body);
    res.status(201).json(note);
}