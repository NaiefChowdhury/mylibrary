if(process.env.NODE_ENV !== 'production'){
    require('dotenv').load()
}

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const mongoose = require('mongoose')

const app = express()


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))


app.use('/', indexRouter)

// Database Connetion
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('MongoDB Coneected'))




const PORT = process.env.PORT || 4000
app.listen(PORT, console.log(`Server started on ${PORT}`))