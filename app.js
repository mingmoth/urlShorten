const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const Url = require('./models/url')
const exphbs = require('express-handlebars')
// const methodOverride = require('method-override')
// const validUrl = require('valid-url')
// const shrinkUrl = require('./tools/shrink')
const routes = require('./routes')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/urlShorten', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongpdb connected')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
// app.use(methodOverride('_method'))
app.use(routes)


app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})