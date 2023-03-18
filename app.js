const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const fileUpload = require('express-fileupload')

const User = require('./models/User')

const initializePassport = require('./config/passport-config')
initializePassport(passport, async (email) => {
    try {
        const user = await User.findOne({email:email})
        // console.log(user.email)
        return user
        
    } catch (error) {
        console.log(error.message)
        return null
    }
}, async (id)=>{
    try {
        const user = await User.findById(id)
        // console.log(user.email)
        return user
        
    } catch (error) {
        console.log(error.message)
        return null
    }
})
const app = express()

// routes
const homeRouter = require('./routes/home')
const authRouter = require('./routes/auth')
const productRouter = require('./routes/products')
const aboutusRouter = require('./routes/aboutus')
const cartRouter = require('./routes/cart')

// middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(morgan('dev'))
app.use(flash())
app.use(session({
    secret: "amogus",
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(fileUpload())

// view engine

app.set('view engine','ejs')

// database connection

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1/foeDatabase",{
    useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', ()=> console.log('Connected to Mongoose'))

// routes

app.use('/',homeRouter);
app.use('/auth',authRouter);
app.use('/products',productRouter);
app.use('/aboutus',aboutusRouter);
app.use('/cart',cartRouter);


// server listening

app.listen(3000,()=>{
    console.log('Listening on http://localhost:3000')
})