const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
// const methodOverride = require('method-override')
const routes = require('./routes')

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
// app.use(methodOverride('_method'))
app.use(routes)


app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})