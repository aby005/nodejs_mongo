var express = require('express');
var app = express.Router();
var itemController = require('../controller/item.controller');

app.post('/add-item', itemController.postItem);
app.get('/get-single-item/:_id', itemController.getItem);
app.get('/get-all-items', itemController.getAllItems);
app.post('/add-category', itemController.addCategory);
app.get('/get-categories', itemController.getCategories);
app.get('/get-items-by-category/:category', itemController.getItemByCategory);
app.delete('/delete/item/:_id', itemController.deleteItem);
app.put('/edit-item', itemController.editItem);
app.post('/add-to-cart', itemController.addToCart);
app.put('/edit-cart', itemController.editCart);
app.get('/get-cart/:email', itemController.getCart);
app.post('/buy-item', itemController.buyItem);
app.get('/get-order-by-id/:orderId', itemController.getOrderById);
app.get('/get-all-orders/:user', itemController.getAllOrdersOfUser);
module.exports = app;