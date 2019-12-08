var mongoose = require('mongoose');

var userModel = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: Number
    },
    password: {
        type: String
    },
    gender: {
        type: String
    },
    role: {
        type: String
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address'
    }
});

module.exports = mongoose.model('user', userModel);