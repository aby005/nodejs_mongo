var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({

    itemName: {
        type: String
    },

    description: {
        type: String
    },
    brand: {
        type: String
    },
    price: {
        type: Number
    },
    mrp: {
        type: Number
    },
    discount: {
        type: Number
    },
    starRating: {
        type: Number
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    imageUrl: {
        type: String
    },
    seller: {
        type: String
    }
});

module.exports = mongoose.model('item', itemSchema);