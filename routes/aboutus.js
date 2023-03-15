const { Router } = require('express')
const router = Router()


router.get('/', (req,res)=>{
    res.send('About us lmao')
})


module.exports = router;