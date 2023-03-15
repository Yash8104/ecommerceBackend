const { Router } = require('express')
const router = Router()
const {checkAuthenticated} = require('../middleware/authUser')

router.get('/', checkAuthenticated, (req,res)=>{
    res.send('Products lmao')
})

router.get('/:id',checkAuthenticated, (req,res)=>{
    res.send('some product lmao')
})

module.exports = router;