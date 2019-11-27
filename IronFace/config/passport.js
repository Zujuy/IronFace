const passport = require("passport");

const User = require("../models/User");

// Local Strategy
passport.use(User.createStrategy());



// We need to serialize and deserialize the user, no matter which strategy we are using
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;
