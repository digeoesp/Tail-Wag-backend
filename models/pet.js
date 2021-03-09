const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const petSchema = new Schema({
    name: String,
    type: String,
    species: String,
    gender: String,
    age: String
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;