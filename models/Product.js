const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true,'Please enter the title of the product']
    },
    price:{
        type: Number,
        required: [true, 'Please enter the price of the product']
    },
    description:{
        type: String,
        required: [true,'Please enter the description of the product']
    },
    rating:{
        type: Number,
        required: [true, 'Please enter the rating of the product']
    },
    imagePath: {
        type: String,
        required: [true, 'Please enter the image path of the product']
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'review'
        }
    ]
})




const Product = mongoose.model('product', productSchema)



module.exports = Product