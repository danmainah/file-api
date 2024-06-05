const express = require("express");
const cors = require('cors')
const passport = require('passport');
const bodyParser = require('body-parser');
const app = express();

require('./auth/auth');

const routes = require('./routes/user');
const uploads = require('./routes/uploads');

app.use(bodyParser.json())
app.use(passport.initialize());
app.use(cors())

let port = process.env.PORT;

if (port == null || port == "") {
port = 3000;
}

app.listen(port, ()=>{
console.log('App listening...')
})

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.get('/', (req, res) => {
    res.json('Welcome to file api, an apai that helps you to store your files')
  })
app.use('/user', routes);
app.use('/uploads',passport.authenticate('jwt', { session: false }), uploads);
