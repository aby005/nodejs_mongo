var mongoose = require('mongoose');

var cartSchema = mongoose.Schema({


    userEmail: {
        type: String
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item'
    }]
});

module.exports = mongoose.model('cart', cartSchema);