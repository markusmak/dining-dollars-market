const express = require('express')
const { Mongoose } = require('mongoose')
const isAuthenticated = require('../config/isAuthenticated')


const router = express.Router()

const Swipe = require('../model/swipe')
const User = require('../model/user')

//addSwipe
router.post('/add', isAuthenticated, async (req, res, next) => {

  console.log('Start Adding Swipe...')
  let s = null
  const data = req.body
  const { userID, price, numSupply, numCurrent} = data
  await Swipe.findOne({ userID, price }, async (err, swipe) => {
    if (err) {
      console.log(err)
      next(new Error('Checking find has errors'))
    } 
    s = swipe
  }).clone().catch((err) => { console.log(err) })
  if (s) {
    const { _id } = s
    const numSupply_ = s.numSupply + numSupply
    const numCurrent_ = s.numCurrent + numCurrent
    await Swipe.updateOne({ _id }, {numSupply: numSupply_, numCurrent: numCurrent_}, (err, _) => {
      if (err !== null) {
        console.log(err)
        next(new Error('Updating swipe has errors'))
      }
    }).clone()
  } else {
    await Swipe.create(data, (err, _) => {
      if (err !== null) {
        console.log(err)
        //next(new Error('Adding swipe has errors'))
      }
    })
  }
  console.log('Adding Swipe Complete...')
  res.send('Adding Swipe Complete')
})

//getSwipe
router.get('/swipe', async (req, res) => {
  const { id } = req.query
  if (id) {
    const swipes = await Swipe.find({userID: id}, (err, res, next) => {
      if (err !== null) {
        console.log(err)
        next(new Error('Finding swipe has errors'))
      }
    }).clone()
    res.send(swipes)
  } else {
    res.send(null)
  }
})

//getFloor
router.get('/floor', async (req, res) => {
  const swipe = await Swipe.find({}, (err, _) => { 
    if (err !== null) { 
      res.send(null) 
    } 
    }).sort({"price": 1}).limit(1).clone()
  if (swipe.length == 0) {
    res.send(null)
  } else {
    const s2 = await Swipe.find({price: swipe[0].price}, (err, _) => { 
      if (err !== null) { 
        res.send(null) 
      } 
      }).clone()
    let numCurrent = 0;
    s2.forEach(e => {
      numCurrent += e.numCurrent
    })
    res.send({numCurrent, price: swipe[0].price})
  }
})

//removeSwipes
router.post('/remove', isAuthenticated, async (req, res) => {
  let { num } = req.body
  let list = []
  for await (const swipe of Swipe.find().sort({"price": 1})) {
    if (swipe.numCurrent > num) {
      const user = await Swipe.updateOne({ _id: swipe._id }, {numCurrent: swipe.numCurrent - num}, (err, res, next) => {
        if (err) {
          console.log(err)
          next(new Error('Updating swipe has errors'))
        }
      }).clone()
      swipe.numCurrent = num
      const u = await User.findOne({_id: swipe.userID})
      const s = {...swipe._doc, numCurrent: num, username: u.username, email: u.email}
      list.push(s)
      break
    } else {
      const u = await User.findOne({_id: swipe.userID})
      const s = {...swipe._doc, username: u.username, email: u.email}
      await Swipe.deleteOne({ _id: swipe._id }, (err, res, next) => {
        if (err) {
          console.log(err)
          next(new Error('Updating swipe has errors'))
        }}).clone()
      list.push(s)
      num -= swipe.numCurrent
    }
  }
  res.send(list)
})

module.exports = router
