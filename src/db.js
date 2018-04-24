const mongoose = require('mongoose')

const connectToDB = (url = 'mongodb://localhost/done') => {
  return mongoose.connect(url)
}

module.exports = connectToDB
