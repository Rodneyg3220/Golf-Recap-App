const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const roundSchema = new Schema({
    name: String,
    score: Number,
    numberOfPutts: Number,
    numberOfFairways: Number,
    date: Date,
    user: Schema.Types.ObjectId
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Round', roundSchema);
