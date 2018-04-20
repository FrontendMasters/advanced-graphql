const mongoose = require('mongoose')

const connectToDB = (url = 'mongodb://localhost/fly-stuff') => {
  return mongoose.connect(url)
}

module.exports = connectToDB
