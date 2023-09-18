// Require passport js library
const passport = require('passport');


// Requring strategy of passport-local
const LocalStrategy = require('passport-local').Strategy;

// importing users
const User = require('../models/user')

// AUTHENTICATION USING PASSPORT
passport.use(new LocalStrategy({
    // defining what we use as a unique
    usernameField:'email'
    },
    // callback function in-build to passport
    // done below is callback function which is reporting to passport.js
    function(email, password, done){
        // find the user and establish the identity
        // User.findOne({email:email},function(err,user){
        //     if(err){
        //         console.log('Error in finding user --> Passport');
        //         // Done bassically takes two argument one is err and second is something else, done reports passport that error has happened
        //         return done(err)
        //     }
        //     if(!user || user.password != password){
        //         console.log('Invalid Username/Password');
        //         // false in below line means authentication is false
        //         return done(null,false);
        //     }
        //     return done(null,user);
        // })
        User.findOne({email:email})
            .then((user)=>{
                if(!user || user.password != password){
                    console.log('Invalid Username/Password');
                    // false in below line means authentication is false
                    return done(null,false);
                }
                return done(null,user);
            })
            .catch((err)=>{
                console.log('Error in finding user --> Passport');
                // Done bassically takes two argument one is err and second is something else, done reports passport that error has happened
                return done(err)
            })
    }

));

// Serializing the user to decide which key is to kept in the cookies
// done is callback function

// user id is also encrypted in cookie over here and this is not done by the passport, but by express-session library
passport.serializeUser(function(user,done){
    done(null,user.id)
});



// Deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    // User.findById(id,function(err,user){
    //     if(err){
    //         console.log('Error in finding the user --> Passport');
    //         return done(err);
    //     }
    //     return done(null,user)
    // });
    User.findById(id)
        .then((user)=>{
            return done(null,user) 
        })
        .catch((err)=>{
            console.log('Error in finding the user --> Passport');
            return done(err);
        })
});


// sending data of signed in user to views to render it
    // Check if user is authenticated
    //checkAuthentication() is function created by us to check when user is authenticated or not and this function in used as middleware
    passport.checkAuthentication = function(req, res, next){
        // method by passportjs, if user is signed in then pass the request to the next funtion which is (controller's action)
        if(req.isAuthenticated()){
            return next();
        }

        // if user is not signed in 
        return res.redirect('/users/sign-in')
    }

    passport.setAuthenticatedUser = function(req, res, next){
        if(req.isAuthenticated()){
            // whenever a user is signed in that users information is available in req.user, req.user is already handled by passport, but the same data is not availbale in locals so we are passing it over there
            // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
            res.locals.user  = req.user;
        }
        return next();
    }


module.exports = passport;