var mongoose = require('mongoose');

var addressModel = mongoose.Schema({
    addressLine1: {
        type: String
    },
    addressLine2: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    pincode: {
        type: Number
    },
    mobile: {
        type: Number
    }
});

module.exports = mongoose.model('address', addressModel);