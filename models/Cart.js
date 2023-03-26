const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    products:[
        {

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min:1
        }

        }
    ],

    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

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