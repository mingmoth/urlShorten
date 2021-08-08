const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Url = require('./models/url')
const exphbs = require('express-handlebars')
const validUrl = require('valid-url')
const shrinkUrl = require('./tools/shrink')

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

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const url = req.body.url
  if (!validUrl.isUri(url)) {
    const invalidUrl = 'Invalid URL'
    res.render('index', { invalidUrl })
  }
  if (validUrl.isUri(url)) {
    const baseUrl = 'http://localhost:3000/'
    const short_url = shrinkUrl()
    const originUrl = url
    let shortUrl

    Url.findOne({ originUrl })//從Url.find Url.findOne& 從"url" 改成 "originUrl"
      .lean()
      .then(urls => {
        if (urls) {
          shortUrl = urls.shortUrl
        } else {
          shortUrl = baseUrl + short_url
          Url.create({ originUrl, shortUrl: shortUrl })
        }
      })
      .then(() => res.render('index', { shortUrl }))
      .catch(err => console.log(err))
  }
})

app.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl
  const baseUrl = 'http://localhost:3000/'
  Url.findOne({ shortUrl: baseUrl + shortUrl })
    .lean()
    .then(urls => res.redirect(urls.originUrl))
    .catch(err => console.log(err))
})


app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})