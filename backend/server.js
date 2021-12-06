const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const path = require('path');
const AccountRouter = require('./routes/account')
const SwipeRouter = require('./routes/swipe')
const flash = require('connect-flash')
const passport = require('./config/passport')


const app = express()

const MONGO_URI = 'mongodb+srv://markusmakpassword2:markusmakpassword2@cluster0.9ipmf.mongodb.net/dining-dollars?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB Connected…')
})

app.use(express.static('dist')) // set the static folder

// handling POST --> req.body
app.use(express.json())

//session middleware
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767", // environmental variable
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(flash())

app.use('/account', AccountRouter)
app.use('/swipe', SwipeRouter)


app.use((err, req, res, next) => {
  res.status(500).send('There was an error!')
})

// set favicon
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

// set the initial entry point
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// Start listening for requests
app.listen(3000, () => {
  console.log('Listening on port 3000')
})
