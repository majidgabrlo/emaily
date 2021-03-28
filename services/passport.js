const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    // after authentication is done
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // We have user with the ID
        return done(null, existingUser);
      }
      // We don't have any User with the ID
      const user = await new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
      }).save();
      done(null, user);

      // console.log('accessToken', accessToken);
      // console.log('refreshToken', refreshToken);
      // console.log('profile', profile);
    }
  )
);
