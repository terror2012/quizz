const express = require('express')

const bodyParser = require('body-parser')

const morgan = require('morgan')

const app = express()

const mongoose = require('mongoose')

const cookieParser = require('cookie-parser')

const session = require('express-session')

const cors = require('cors')

const memoryStore = require('memorystore')(session)

const defaultSubSystem = require("./routes/default_subsystem.js")

const adminSubSystem = require("./routes/admin_subsystem.js")

mongoose.connect("mongodb://localhost:27017/quizz")

var corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true
}

app.use(morgan('combined'))

app.use(bodyParser.urlencoded({extended: true}))

app.use(cookieParser('secretpasswordthatnooneknows'))

app.use(bodyParser.json())

app.use(express.static('uploads'))

app.use(session({
    cookie: {maxAge: 86400000},
    store: new memoryStore({
        checkPeriod: 86400000
    }),
    secret: 'secretpasswordthatnooneknows',
    resave: false
}))

app.use('/', cors(corsOptions), defaultSubSystem)

app.use('/admin', cors(corsOptions), adminSubSystem)

var listener = app.listen(8081, function() {
    console.log('Listening on port ', listener.address().port)
})