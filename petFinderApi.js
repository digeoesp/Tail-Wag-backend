require('dotenv').config()
const axios = require('axios');
const querystring = require('querystring');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
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
    // console.log(response.data);
    const  { token_type, access_token } = response.data;
    axios.get(`https://api.petfinder.com/v2/animals/`, {
        headers: { Authorization: `${token_type} ${access_token}`}
    })
    .then(response =>  {
        // console.log(response.data);
    })
    .catch(error => console.log(error))
})
.catch(error => console.log(error));