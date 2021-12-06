const User = require('../model/user')
const { Mongoose } = require('mongoose')

const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use('google', new GoogleStrategy({
  clientID: "",
  clientSecret: "",
  callbackURL: "http://localhost:3000/account/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ googleId: profile.id })
    if (!user) {
      console.log(profile)
      User.create({ username: profile.name.givenName, googleId: profile.id, email: profile.emails[0].value }, (err, user) => {
        console.log(err)
        if (err !== null) {
          done(null, false, {message: "ERROR!"})
        } 
        return done(null, user);
      })
    } else {
      return done(null, user);
    }
}
));

passport.serializeUser(function(user, done) {
  console.log(`Serialize User...`)
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  console.log("Deserialize Id...")
  User.findById(id, function (err, user) {
     done(err, user);
  });
});

module.exports = passport