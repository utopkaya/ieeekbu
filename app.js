const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()
const hostname = 'localhost'
const port = 3000
const moment = require('moment')
const expressSession = require('express-session')
const mongoStore = require('connect-mongo').default // for session
const methodOverride = require('method-override')

moment.locale('tr')

mongoose.connect('mongodb+srv://umut:umut@cluster0.rqjga.mongodb.net/ieee', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.use(expressSession({
    secret: 'testotesto',
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({ mongoUrl: 'mongodb+srv://umut:umut@cluster0.rqjga.mongodb.net/ieee' })
}))

// Flash - Message Middleware
app.use((req, res, next) => {
    res.locals.sessionFlash = req.session.sessionFlash
    delete req.session.sessionFlash
    next()
})

app.use(fileUpload())

// BODY PARSER
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// static file
app.use(express.static('public'))


// view engine
app.engine('handlebars', expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    // tarih icin helper
    helpers: {
        generateDate: (date, format) => {
            return moment(date).format(format) // tarihi istedigimiz formatta donecegiz.
        }
    }
}));
app.set('view engine', 'handlebars');

// FOR DELETE POST, AUTHORS, ACTIVITIES ACTUALLY FOR DELETE :D
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// display links Middleware
app.use((req, res, next) => {
    const {userId} = req.session
    if(userId){
        res.locals = {
            displayLink: true
        }
    }else{
        res.locals = {
            displayLink: false
        }
    }
    next()
})


// Routers
const main = require('./routers/main')
const admin = require('./routers/admin/main')
const blog = require('./routers/blogs')
const team = require('./routers/teams')

app.use('/', main)
app.use('/admin', admin)
app.use('/blog', blog)
app.use('/team', team)

app.listen(port, hostname, ()=>{
    console.log(`server adresi : http://${hostname}:${port}`)
})
