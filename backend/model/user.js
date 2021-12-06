const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String  },
  googleId: { type: String }
})

userSchema.methods.validPassword = function( pwd ) {
  return ( this.password === pwd );
};

module.exports = model('User', userSchema)
