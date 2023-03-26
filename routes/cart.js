const { Router } = require('express')
const router = Router()
const Cart = require('../models/Cart')
const {checkAuthenticated} = require('../middleware/authUser')
const Product = require('../models/Product')
const User = require('../models/User')

router.get('/',checkAuthenticated, async(req,res)=>{
    try {   

        // const user = await User.findById(req.user._id)
        const cart = await Cart.findOne({userid: req.user._id}).populate("products.product")
        if(cart){
            res.render('cart.ejs', { cart: cart});
        }else{
            res.render('cart.ejs', { cart: null});
        }
        
        
    } catch (error) {
        console.log(error.message)
        res.redirect('/');
    }
})


router.post('/remove/:id', checkAuthenticated, async(req,res)=>{
    try {  

        const cart = await Cart.findOne({userid: req.user._id}).populate("products.product")
        
        if(cart == null){
            console.log("cart is null")
            throw new Error('CART IS NULL')
        }
            
        
        
        let quantity = 0;
        let index = null;
        cart.products.forEach(function(p, i){
            if(p.product._id == req.params.id){
                quantity = p.quantity;
                index = i;
            }           
        });
        console.log(index)
        console.log(quantity)
        if(quantity == req.body.quantity){
            // max quantity (remove product from cart fully)
            
            cart.totalItems -= req.body.quantity;
            cart.totalPrice -= (cart.products[index].product.price)*req.body.quantity;
            cart.totalShippingCost -= (cart.products[index].product.shippingCost)*req.body.quantity;
            cart.products.splice(index,1);
            cart.save();
        }else{
            // remove only req.body.quantity from cart

            cart.products[index].quantity -= req.body.quantity
            cart.totalItems -= req.body.quantity;
            cart.totalPrice -= (cart.products[index].product.price)*req.body.quantity;
            cart.totalShippingCost -= (cart.products[index].product.shippingCost)*req.body.quantity;
            cart.save();
        }

        res.redirect('/cart')
        
    } catch (error) {
        console.log(error.message)
        res.redirect('/cart')
    }
})

router.post('/:id',checkAuthenticated, async(req,res)=>{
    try {

        const product = await Product.findById(req.params.id);
        const cart = await Cart.findOne({userid: req.user._id}).populate("products.product")

        if(cart == null){
            const newCart = await Cart.create({
                userid: req.user._id,
                totalItems: 1,
                totalPrice: product.price,
                totalShippingCost: product.shippingCost,
                products: [{
                    product: product,
                    quantity: 1
                }]
            })
        }
        
        cart.totalItems = cart.totalItems + 1;
        cart.totalPrice = cart.totalPrice + product.price;
        cart.totalShippingCost = cart.totalShippingCost + product.shippingCost;

        let containesProduct = false;
        if(cart.products != null){
            cart.products.forEach(p => {
                if(p.product._id.toString() === product._id.toString()){
                    containesProduct = true;
                    p.quantity = p.quantity + 1;
                }
            });
        }
        

        
        if(containesProduct == false)
        {   
            
            cart.products.push({
                product: product,
                quantity: 1
            })
        }
        cart.save();
        console.log(cart)
        res.redirect(`/products/${req.params.id}`)
    } catch (error) {
        console.log(error.message)
        res.redirect('/products')
    }
})



module.exports = router;