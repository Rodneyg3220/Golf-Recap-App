const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema ({
    text: String,
    user: Schema.Types.ObjectId
},
{
    timestamps: true
}
)
