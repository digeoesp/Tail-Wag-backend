require('dotenv').config();
// A passport strategy for authenticating with a JSON Web Token
// This allows to authenticate endpoints using a token
const { Strategy, ExtractJwt} = require('passport-jwt');
const mongoose = require('mongoose');

//import user model
const User = require('../models/user');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
    // Add code here
    passport.use(new Strategy(options, (jwt_payload, done)=> {
console.log("🐱", jwt_payload)

        User.findById(jwt_payload.id)
        
        .then(user => {
            //jwt_payload is an object that contains a jwt info
            //done is a call back that we will be using to return user or false
            if(user){
                //if a user is found, return null (for error)
                return done(null, user);
            } else {
                //no user is found
                return done(null, false);
            }
        })
        .catch(error => {
            console.log('****************** error bellow(passport.js)')
            console.log(error)
        })
    }))
}