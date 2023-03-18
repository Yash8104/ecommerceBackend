const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    products:[{

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },

        quantity: {
            type: Number
        }

}],
    totalItems: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    totalShippingCost:{
        type: Number
    }
})

const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart