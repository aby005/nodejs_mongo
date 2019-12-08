var mongoose = require('mongoose');

var categoryModel = mongoose.Schema({
    categoryName: {
        type: String
    }
});

module.exports = mongoose.model('category', categoryModel);