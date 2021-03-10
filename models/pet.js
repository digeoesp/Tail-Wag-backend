const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const petSchema = new Schema({
    name: String,
    type: String,
    species: String,
    gender: String,
    age: String,
    photos: [ {medium:String, large: String}],
    contact: [{ 
        email:String, 
        phone: String, 
        address: {adress1: String,
        city: String,
        state: String,
        postcode: String,
        country: String}}]
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;

//contact":{"email":"lgonzales@godsdogsrescue.org","phone":null,
//"address":{"address1":null,"address2":null,"city":"Von Ormy","state":"TX","postcode":"78073","country":"US"}}