const mongoose = require('mongoose')


const reviewSchema = mongoose.Schema({
    author: {
        type: String,
        required: [true, 'Please enter the author']
    },
    rating:{
        type: Number,
        required: [true, 'Please enter your rating']
    },
    title: {
        type: String,
        required: [true, 'Please enter the title']
    },
    description:{
        type: String
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }
})


const Review = mongoose.model('review',reviewSchema)

module.exports = Review