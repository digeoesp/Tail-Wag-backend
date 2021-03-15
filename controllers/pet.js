const db = require('../models');

const test = (req, res) => {
    res.json({ message: 'User endpoint OK!'})
}


const index = (req, res) => {
    // Purpose: Fetch all Capsules from DB and return
    // console.log('=====> Inside GET controllers/pet');

    db.Pet.find({}, (err, foundPets) => {
        if (err) console.log('Error in pets#index:', err);
        res.json(foundPets);
    });
}

module.exports = {
    test,
    index
};
    