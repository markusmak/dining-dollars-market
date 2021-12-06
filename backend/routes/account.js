const express = require('express')
const { Mongoose } = require('mongoose')

const router = express.Router()
const User = require('../model/user')
const passport = require('../config/passport')

const isAuthenticated = require('../config/isAuthenticated')

router.use(passport.initialize())
router.use(passport.session())

router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 
                                            'https://www.googleapis.com/auth/userinfo.email'] }));

router.get('/auth/google/callback', 
passport.authenticate('google'),
function(req, res) {
  if (req.user !== null) {
    console.log("Google Login Successful...")
    req.session.username = req.user.username
    req.session.googleId = req.user.googleId
    req.session.userID = req.user._id
    req.session.email = req.user.email
    res.redirect("/")
  } else {
    res.redirect("/login")
  }
});

// login
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.send('User does not exist')
    } else {
      const { password: passDB, _id: userID, email } = user // const passDB = user.password
      if (password === passDB) {
        req.session.username = username
        req.session.password = password
        req.session.userID = userID
        req.session.email = email
        res.send(user)
      } else {
        res.send('User credentials are wrong')
      }
    }
  } catch (err) {
    next(new Error('User creation has problems')) // preferred
    // throw new Error('user creation has problems')
  }
})

// signup
router.post('/signup', async (req, res, next) => {
  const { username, password, email } = req.body
  const user = await User.create({ username, password, email })
  req.session.username = username
  req.session.userID = user._id
  req.session.password = password
  req.session.email = email
  res.send(user)
})

router.get('/users', async (req, res) => {
  try {
    if (req.session.username == undefined || req.session.username === '') {
      res.send('User is logged out')
    } 
    res.send(req.session.username)
  } catch {
      res.send("This is an error")
  } 
})

// Login?
router.get('/user', (req, res) => {  
  try {
    if (req.session.username === undefined) {
      res.send('User is logged out')
    } else {
      res.send(req.session)
    }
  } catch {
      res.send("This is an error")
  } 
})

// logout
router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = undefined
  req.session.password = undefined
  req.session.userID = undefined
  req.session.email = undefined
  res.send('user is logged out')
})

module.exports = router
