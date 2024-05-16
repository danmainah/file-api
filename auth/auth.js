const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../database/User');
const Blacklist = require('../database/Blacklist')

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    async (username, password, done) => {
      try {
        const user = await User.findByUsername(username);

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done({error});
      }
    }
  )
);

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async ( req, username, password, done) => {
      try {
        const { email } = req.body; // Access email from the request body
        const user = await User.create({username, email, password});

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const blacklistedToken = await Blacklist.findOne({ where: { token: token } });

        if (blacklistedToken) {
          return done(null, false);
        }

        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
