const { Router } = require('express')
const router = Router()
const {checkAuthenticated} = require('../middleware/authUser')
const Product = require('../models/Product')
const Review = require('../models/Review')

router.get('/',checkAuthenticated, async(req,res)=>{
    try {
        const products = await Product.find({}).limit(9).exec()
        res.render('products.ejs',{products:products})
    } catch (error) {
        console.log(error.message)
        res.redirect('/')
    }
})

router.get('/add', checkAuthenticated, (req,res)=>{
    res.render('productSubmit.ejs')
})

router.post('/add',checkAuthenticated, async(req,res)=>{
    try {
        const product = await Product.create({
            title:req.body.title,
            price:req.body.price,
            description:req.body.description,
            rating:req.body.rating,
            imagePath:req.body.imagepath,
        })
        res.redirect('/products')
    } catch (error) {
        console.log(error.message)
        res.redirect('/')
    }
    

})

router.get('/:id',checkAuthenticated, async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id).populate('reviews')
        const reviews = product.reviews;

        res.render('product.ejs', {product:product, reviews: reviews})
    } catch (error) {
        console.log(error.message)
        res.redirect('/')
    }
    
})

router.post('/:id', checkAuthenticated, async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id)
        
        const review = await Review.create({
            author: req.user.name,
            rating: req.body.rating,
            title: req.body.title,
            description: req.body.description
        })
        
        await product.reviews.push(review)
        await product.save()
        
        console.log(product.reviews[0])
        // console.log(req.user)
        res.redirect(`/products/${req.params.id}`)

    } catch (error) {
        console.log(error.message)
        res.redirect('/products')
    }
})

module.exports = router;