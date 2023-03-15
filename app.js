const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const app = express()

// routes
const homeRouter = require('./routes/home')
const authRouter = require('./routes/auth')
const productRouter = require('./routes/products')
const aboutusRouter = require('./routes/aboutus')

// middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan('dev'))


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



// server listening

app.listen(3000,()=>{
    console.log('Listening on http://localhost:3000')
})