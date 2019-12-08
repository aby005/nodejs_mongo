var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({

    userEmail: {
        type: String
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item'
    }],
    userAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address'
    },
    orderDate: {
        type: Date
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payment'
    },
    amount: {
        type: Number
    }
});

module.exports = mongoose.model('order', orderSchema);