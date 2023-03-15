const { Router } = require('express')
const router = Router()


router.get('/', (req,res)=>{
    res.send('Products lmao')
})

router.get('/:id', (req,res)=>{
    res.send('some product lmao')
})

module.exports = router;