const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Blacklist = require('../database/Blacklist')

const router = express.Router();

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

router.post(
    '/login',
    async (req, res, next) => {
      passport.authenticate(
        'login',
        async (err, user, info) => {
          try {
            if (err || !user) {
              const error = new Error('An error occurred.');
  
              return next(error);
            }
  
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);
  
                const body = { id: user.id, email: user.email,  username: user.username };
                const token = jwt.sign({ user: body }, 'TOP_SECRET');
                return res.json({ token });
              }
            );
          } catch (error) {
            return next({error});
          }
        }
      )(req, res, next);
    }
  );

  router.get('/logout', (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Extract the token
    Blacklist.create({ token }); // Add the token to the blacklist
    res.json({ message: 'You are now logged out!' });
  });

  
module.exports = router;