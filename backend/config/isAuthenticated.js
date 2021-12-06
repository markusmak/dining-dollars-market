const express = require('express')

const isAuthenticated = (req, res, next) => {
  if ((req.session.username === undefined)) {
    next(new Error('User is undefined'))
  } else {
    next()
  }
}

module.exports = isAuthenticated
