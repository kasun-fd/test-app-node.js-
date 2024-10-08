const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserSchema = require('../model/UserSchema');
const crypto = require('crypto');
require('dotenv').config();


passport.use(new GoogleStrategy({
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackUrl:'/auth/google/callback',
    passReqToCallBack:true
}, async  (req, accessToken, refreshToken, profile, done) =>{
    console.log(profile);
    done(null,profile);
}));

passport.serializeUser((user,done) => {
    done(null,user);
})

passport.deserializeUser(async (id,done) => {
    done(null,id);
})