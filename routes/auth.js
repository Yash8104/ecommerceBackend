const { Router } = require('express')
const router = Router()


router.get('/', (req,res)=>{
    res.redirect('/auth/login');
})

router.get('/login', (req,res)=>{
    res.send('Login page ')
})

router.get('/signup', (req,res)=>{
    res.send('Sign up page ')
})

module.exports = router;