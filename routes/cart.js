const { Router } = require('express')
const router = Router()
const Cart = require('../models/Cart')
const {checkAuthenticated} = require('../middleware/authUser')
const Product = require('../models/Product')
const User = require('../models/User')

router.get('/',checkAuthenticated, (req,res)=>{
    res.render('cart.ejs');
})

router.post('/:id',checkAuthenticated, async(req,res)=>{
    try {

        const product = await Product.findById(req.params.id);
        const user = await User.findById(req.user._id).populate('cart')
        const cart = await Cart.findById(user.cart._id).populate('products.product');
        
        cart.totalItems = cart.totalItems + 1;
        cart.totalPrice = cart.totalPrice + product.price;
        cart.totalShippingCost = cart.totalShippingCost + product.shippingCost;

        let containesProduct = false;
        cart.products.forEach(p => {
            if(p.product._id.toString() === product._id.toString()){
                containesProduct = true;
                p.quantity = p.quantity + 1;
            }
        });

        cart.products.forEach(p => {
            if(p.product._id.toString() === product._id.toString()){
                console.log(p.quantity)
            }
        });
        
        if(containesProduct == false)
        {
            console.log(product)
            cart.products.push({
                product: product,
                quantity: 1
            })
        }
        cart.save();
        user.save();
        console.log(cart)
        res.redirect('/cart')
    } catch (error) {
        console.log(error.message)
        res.redirect('/cart')
    }
})

module.exports = router;