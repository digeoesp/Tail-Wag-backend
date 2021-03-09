// Seed Database
const axios = require('axios');
const db = require('./models');
const addPets = async () => {
    const response = await axios.get('https://api.petfinder.com/v2/animals/');
    const data = response.data; // array of objects [{}, {}, {}]
    const newPets = await data.map((petObject) => {
        const { name, type, species, gender, age } = petObject; // destructuring
        const resultObj = {
            name: name,
            type: type,
            species: species,
            gender: gender,
            age: age
        }
        return resultObj;
    });
    // Add newCapsules to DB
    const allNewPets = await db.Pet.create(newPets);
}
// run function
addPets();
// Do the same thing if you want to seed other collections (using models)