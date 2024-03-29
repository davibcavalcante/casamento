const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const connectDataBase = require('./config/conexao-db')

const viewsRouter = require('./routes/views')
const guestRouter = require('./routes/database')

const app = express()
    
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', viewsRouter)
app.use('/database', guestRouter)
app.use('/healthcheck', (req, res) => {
    res.status(200).send('ok')
})
connectDataBase()

module.exports = app