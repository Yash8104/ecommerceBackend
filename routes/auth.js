const { Router } = require('express')
const router = Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const passport = require('passport')
const { checkNotAuthenticated } = require('../middleware/authUser')

router.get('/', (req,res)=>{
    res.redirect('/auth/login');
})

router.get('/login',checkNotAuthenticated, (req,res)=>{
    res.render('login.ejs')
})

router.post('/login',checkNotAuthenticated, passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
}))

router.get('/signup',checkNotAuthenticated, (req,res)=>{
    res.render('signup.ejs')

})

router.post('/signup',checkNotAuthenticated, async(req,res)=>{
    // sign up user
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10);

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/auth/login')

    } catch (error) {
        console.log(error.message)
        res.redirect('/auth/signup')
    }

    

})


router.delete('/logout', (req,res,next)=>{
    req.logOut(function(err){
        if(err){ return next(err)}
    })
    res.redirect('/auth/login')
})

module.exports = router;