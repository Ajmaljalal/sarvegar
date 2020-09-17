const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id)
    .then((user) =>{
        done(null, user);
    })
});

passport.use(
    new GoogleStrategy(
        {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            const user = await User.findOne({googleId: profile.id})
                if(user){
                    // We have the user
                    done(null, user);
                } else {
                    // We do not have the user, make one and save it
                    const user = await new User({googleId: profile.id, name: profile.displayName, email: profile.emails[0].value, imageURL: profile.photos[0].value}).save()
                    //console.log('user: ', user)
                    done(null, user);
                }
        }
    )
);