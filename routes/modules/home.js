const express = require('express')
const router = express.Router()

const Url = require('../../models/url')
const validUrl = require('valid-url')
const shrinkUrl = require('../../tools/shrink')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
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
          Url.create({ originUrl: originUrl, shortUrl: shortUrl })
        }
      })
      .then(() => res.render('index', { shortUrl }))
      .catch(err => console.log(err))
  }
})

router.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl
  console.log(shortUrl)
  const baseUrl = 'http://localhost:3000/'
  Url.findOne({ shortUrl: baseUrl + shortUrl })
    .lean()
    .then((urls) => {
      return res.redirect(urls.originUrl)
    })
    .catch(err => console.log(err))
})

module.exports = router