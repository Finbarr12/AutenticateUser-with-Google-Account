const passport = require("passport");
const dotenv = require("dotenv");
const modelUpdate = require("./model/modelUpdate");

dotenv.config();

var GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:2001/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let user = await modelUpdate.findOne({ googleId: profile.id });

        if (user) {
          done(null, user);
        } else {
          user = await modelUpdate.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.email,
          });
          done(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});
