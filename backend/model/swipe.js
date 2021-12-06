const { Schema, model } = require('mongoose')

const swipeSchema = new Schema({
  userID: { type: String, required: true},
  numSupply: { type: Number, required: true},
  numCurrent: { type: Number, required: true},
  price: { type: Number, required: true},
  active: { type: Boolean, required: true},
})

module.exports = model('Swipe', swipeSchema)
