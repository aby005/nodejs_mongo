var Item = require('../models/item');
var Category = require('../models/category');
var logger = require('../../logger');
var Cart = require('../models/cart');
var Order = require('../models/order');
var Payment = require('../models/payment');

var itemDao = {
    postItem: postItem,
    getItem: getItem,
    getAllItems: getAllItems,
    addCategory: addCategory,
    getCategories: getCategories,
    getItemByCategory: getItemByCategory,
    getOneCategory: getOneCategory,
    deleteItem: deleteItem,
    editItem: editItem,
    addToCart: addToCart,
    editCart: editCart,
    getCart: getCart,
    checkIfCartExists: checkIfCartExists,
    addToExistingCart: addToExistingCart,
    buyItem: buyItem,
    getOrderById: getOrderById,
    getAllOrdersOfUser: getAllOrdersOfUser
}

function postItem(req) {
    return new Promise((resolve, reject) => {
        var item = new Item(req);
        item.save(function (err, insertedData) {
            if (!err) {
                logger.info('Item added successfully {{in Dao}}');
                resolve(insertedData);
            } else {
                logger.error('Item not added {{in Dao}}');
                console.log(err);
                reject(err);
            }

        })
    })
}

function editItem(req) {

    var item = {};
    item.itemName = req.itemName;
    item.seller = req.seller;
    item.price = req.price;
    item.mrp = req.mrp;
    item.imageUrl = req.imageUrl;
    item.discount = req.discount;
    item.description = req.description;
    item.brand = req.brand;
    item.category = req.category
    console.log(req);
    return Item.findOneAndUpdate({
            '_id': req._id
        },
        item
    );
}

function getAllItems(req) {
    filterColumns = {};
    return new Promise((resolve, reject) => {

        Item.find({}, filterColumns).populate('category').exec(function (err, items) {
            if (!err) {
                logger.info("All items fetched {{In DAO}}");
                resolve(items);
            } else {
                logger.error("Failed to fetch all items{{In DAO}}")
                reject(err);
            }
        });
    });

}

function getItem(id) {
    return Item.findOne({
        '_id': id
    });
}

function deleteItem(id) {
    return Item.deleteOne({
        '_id': id
    });
}

function addCategory(body) {

    return new Promise((resolve, reject) => {
        var category = new Category(body);
        category.save((err, saved) => {
            if (!err) {
                logger.info('Category added successfully {{in Dao}}');
                resolve(saved);
            } else {
                logger.error('Category not added {{in Dao}}');
                reject(err);
            }
        });
    });

}

function getCategories() {
    return Category.find({});
}

function checkIfCartExists(email) {

    return Cart.findOne({
        "userEmail": email
    }).count();
}

function getItemByCategory(categoryId) {
    filterColumns = {};
    return new Promise((resolve, reject) => {

        Item.find({
            'category': categoryId
        }, filterColumns).populate('category').exec(function (err, items) {
            if (!err) {
                logger.info("All items by category fetched {{In DAO}}");
                resolve(items);
            } else {
                logger.error("Failed to fetch all items by category{{In DAO}}")
                reject(err);
            }
        });
    });
}

function getOneCategory(categoryName) {
    return Category.findOne({
        'categoryName': categoryName
    });
}

function addToCart(req) {
    return new Promise((resolve, reject) => {
        var item = [];
        item.push(req.item);
        var cart = {};
        cart.userEmail = req.userEmail;
        cart.items = item;
        console.log(cart);
        var saveCart = new Cart(cart);
        saveCart.save((err, insertedData) => {
            if (!err) {
                logger.info('Item added to cart {{in dao}}');
                resolve(insertedData);
            } else {
                logger.error('Item not added to cart {{in dao}}');
                console.log(err);
                reject(err);
            }
        });
    });
}

function addToExistingCart(req) {
    var item = [];
    item.push(req.item);
    return Cart.findOneAndUpdate({
        'userEmail': req.userEmail
    }, {
        $push: {
            items: item
        }
    })
}

function editCart(req) {
    return new Promise((resolve, reject) => {
        Cart.findByIdAndUpdate(req._id, {
            $pull: {
                items: req.itemId
            }
        }, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                console.log(err);
                reject(err);
            }
        });
    });
}

function getCart(email) {
    filterColumns = {};
    return new Promise((resolve, reject) => {

        Cart.find({
            'userEmail': email
        }, filterColumns).populate('items').exec(function (err, items) {
            if (!err) {
                logger.info("All cart items fetched {{In DAO}}");
                resolve(items);
            } else {
                logger.error("Failed to fetch all Cart items {{In DAO}}")
                reject(err);
            }
        });
    });
}

function buyItem(req) {

    return new Promise((resolve, reject) => {
        var item = [];

        for (var i = 0; i < req.items.length; i++) {
            item.push(req.items[i]);
        }

        var order = {};
        order.userEmail = req.userEmail;
        order.items = item;
        order.address = req.address;
        order.orderDate = req.orderDate;
        order.payment = req.payment;
        order.amount = req.amount;

        var order_save = new Order(order);
        order_save.save((err, insertedData) => {
            if (!err) {
                logger.info('Item ordered {{in Dao}}');
                resolve(insertedData);
            } else {
                logger.error('Item not ordered {{in Dao}}');
                reject(err);
            }
        });
    });
}

function getOrderById(orderId) {

    return new Promise((resolve, reject) => {
        Order.findById(orderId)
            .populate('payment').populate('items').populate('address')
            .exec((err, order) => {
                if (!err) {
                    console.log(order);
                    resolve(order);
                } else {
                    console.log(err);
                    reject(err);
                }
            });
    });
}

function getAllOrdersOfUser(email) {

    return new Promise((resolve, reject) => {
        Order.find({
                'userEmail': email
            })
            .populate('payment').populate('items').populate('address')
            .exec((err, orders) => {
                if (!err) {
                    console.log(orders);
                    resolve(orders);
                } else {
                    console.log(err);
                    reject(err);
                }
            });
    });
}
module.exports = itemDao;