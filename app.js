// Imports
require('dotenv').config()
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const passport = require('passport')
require('./config/passport')(passport);
const axios = require('axios');
const querystring = require('querystring');
const db = require('./models');
const { type } = require('os');


const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// App Set up
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // JSON parsing
app.use(cors()); // allow all CORS requests
app.use(passport.initialize());




// API Routes
app.get('/api/', (req, res) => {
  res.json({ name: 'MERN Auth API', greeting: 'Welcome to the our API', author: 'YOU', message: "Smile, you are being watched by the Backend Engineering Team" });
});

app.use('/api/examples', routes.example);
app.use('/api/users', routes.user);
app.use('/api/pets', routes.pet);

app.get('/api/fetch-pets', async (req, res) => {
  let buff = new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`);
let authKey = buff.toString('base64');// changes key to string
axios.post('https://api.petfinder.com/v2/oauth2/token', 
    querystring.stringify({
        grant_type: 'client_credentials',
    }), 
    {
    headers: {
        Authorization: `Basic ${authKey}`
    } 
})
.then((response)=>{                    
    const  { token_type, access_token } = response.data;
    const userInput =req.body.input
    axios.get(`https://api.petfinder.com/v2/animals`, {
        headers: { Authorization: `${token_type} ${access_token}`}
    })
    .then(async response =>  {
// run function
      //add each objects information
    //  console.log("********", response.data)
      const newPets = await response.data.animals.map((animalObject) => {
        const { name, type, species, gender, age, photos, contact } = animalObject;
       const resultObj = {
          name: name,
          type: type,
          species: species,
          gender: gender,
          age: age,
          photos: photos,
          contact: contact
        
      }
      return resultObj
    });
      const allNewPets = await db.Pet.create(newPets);
      // console.log(allNewPets)
      res.send(allNewPets)
          //email: response.animals.contact.email
    })
    .catch(error => console.log(error))
})
.catch(error => console.log(error));

})

app.post('/api/search', async (req, res) => {
 
  let buff = new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`);
  // console.log(req.body, 'this is my body')
  const {type, postalcode} = req.body
let authKey = buff.toString('base64');// changes key to string
axios.post(`https://api.petfinder.com/v2/oauth2/token`, 
    querystring.stringify({
        grant_type: 'client_credentials',
    }),
    {
    headers: {
        Authorization: `Basic ${authKey}`
    } 
})
.then((response)=>{                    
    const  { token_type, access_token } = response.data;
    axios.get(`https://api.petfinder.com/v2/animals/?type=${type}&&location=${postalcode}`, {
        headers: { Authorization: `${token_type} ${access_token}`}
    })
    .then(async response =>  {
// run function
      //add each objects information
     
      const newPets = await response.data.animals.map((animalObject) => {
        const { name, type, species, gender, age, photos, contact } = animalObject;
       const resultObj = {
          name: name,
          type: type,
          species: species,
          gender: gender,
          age: age,
          photos: photos,
          contact: contact
        
      }
      return resultObj
    });
      const allNewPets = await db.Pet.create(newPets);
      
      res.send(allNewPets)
          //email: response.animals.contact.email
    })
    .catch(error => console.log(error))
})
.catch(error => console.log(error));

})

// app.get('/profile/:id', async (req, res) => {
//   const userId = req.query.id 
//   const user= await
// })




// Server
const server = app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
module.exports = server;











































