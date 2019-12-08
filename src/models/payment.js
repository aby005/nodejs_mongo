var mongoose = require('mongoose');

var paymentSchema = mongoose.Schema({

    paymentMethod: {
        type: String
    }
});

module.exports = mongoose.model('payment', paymentSchema);