const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/urlShorten', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongpdb connected')
})

module.exports = db