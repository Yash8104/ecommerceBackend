const { Router } = require('express')
const router = Router()


router.get('/', (req,res)=>{
    res.redirect('/home');
})

router.get('/home', (req,res)=>{
    try{
        console.log(req.user.name)
    }catch(error){
        console.log('error no user.name ')
    }
    res.render('home.ejs')
})

router.get('/aboutus', (req,res)=>{
    res.render('contactus.ejs')
})

router.get('/contactus', (req,res)=>{
    res.redirect('/aboutus')
})

module.exports = router;