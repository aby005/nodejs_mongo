var itemController = {
    postItem: postItem,
    getItem: getItem,
    getAllItems: getAllItems,
    addCategory: addCategory,
    getCategories: getCategories,
    getItemByCategory: getItemByCategory,
    deleteItem: deleteItem,
    editItem: editItem,
    addToCart: addToCart,
    editCart: editCart,
    getCart: getCart,
    buyItem: buyItem,
    getOrderById: getOrderById,
    getAllOrdersOfUser: getAllOrdersOfUser
}
var Response = require('../response');
var itemService = require('../service/item.service');
var logger = require('../../logger');

function postItem(req, res) {
    var response = new Response();
    console.log(req.body);
    itemService.postItem(req.body).
    then((result) => {
        response.data.result = result;
        response.status.statusCode = 200;
        response.status.message = "Item Added to the database";
        logger.info("Item Added {{In controller}}");
        res.status(200).json(response);
    }).catch((err) => {
        response.status.statusCode = '500';
        response.status.message = "Item cannot be added Successfully";
        logger.error("Item cannnot be added {{In controller}}");
        res.status(500).json(response);
    });
}

function editItem(req, res) {
    var response = new Response();

    itemService.editItem(req.body).
    then((result) => {
        response.data.result = result;
        response.status.statusCode = 200;
        response.status.message = "Item Updated to the database";
        logger.info("Item Updated {{In controller}}");
        res.status(200).json(response);
    }).catch((err) => {
        response.status.statusCode = '500';
        response.status.message = "Item cannot be Updated Successfully";
        logger.error("Item cannnot be Updated {{In controller}}");
        res.status(500).json(response);
    });
}

function getItem(req, res) {
    var response = new Response();
    itemService.getItem(req.params._id).
    then((result) => {
        response.data.result = result;
        response.status.statusCode = 200;
        response.status.message = "Item fetched from the database";
        logger.info("Item fetched {{In controller}}");
        res.status(200).json(response);
    }).catch((err) => {
        response.status.statusCode = '500';
        response.status.message = "Item not fetched from database";
        logger.error("Item not fetched {{In controller}}");
        res.status(500).json(response);
    });
}

function getAllItems(req, res) {
    var response = new Response();
    itemService.getAllItems().
    then((result) => {
        response.data.result = result;
        response.status.statusCode = 200;
        response.status.message = "Item received from the database";
        logger.info("Item received from database{{In controller}}");
        res.status(200).json(response);
    }).catch((err) => {
        response.status.statusCode = '500';
        response.status.message = "Item not received from database";
        logger.error("Item not received  from database{{In controller}}");
        res.status(500).json(response);
    });
}

function getCategories(req, res) {
    var response = new Response();
    itemService.getCategories().
    then((result) => {
        response.data.result = result;
        response.status.statusCode = 200;
        response.status.message = "Category received from the database";
        logger.info("Category received from {{In controller}}");
        res.status(200).json(response);
    }).catch((err) => {
        response.status.statusCode = '500';
        response.status.message = "Category not received from database";
        logger.error("Category not received {{In controller}}");
        res.status(500).json(response);
    });
}

function addCategory(req, res) {
    var response = new Response();
    itemService.addCategory(req.body).
    then((result) => {
        response.data.result = result;
        response.status.statusCode = 200;
        response.status.message = "Category added to the database";
        logger.info("Category added {{In controller}}");
        res.status(200).json(response);
    }).catch((err) => {
        response.status.statusCode = '500';
        response.status.message = "Category not added to from database";
        logger.error("Category not added {{In controller}}");
        res.status(500).json(response);
    });
}

function getItemByCategory(req, res) {
    var response = new Response();
    itemService.getItemByCategory(req.params.category).
    then((result) => {
        response.data.result = result;
        response.status.statusCode = 200;
        response.status.message = "Items by Category fetched from the database";
        logger.info("Items by Category fetched {{In controller}}");
        res.status(200).json(response);
    }).catch((err) => {
        response.status.statusCode = '500';
        response.status.message = "Items by Category not fetched from database";
        logger.error("Items by Category not fetched {{In controller}}");
        res.status(500).json(response);
    });
}

function deleteItem(req, res) {
    var response = new Response();
    itemService.deleteItem(req.params._id).
    then((result) => {
        response.data.result = result;
        response.status.statusCode = 200;
        response.status.message = "Item deleted from the database";
        logger.info("Item deleted {{In controller}}");
        res.status(200).json(response);
    }).catch((err) => {
        response.status.statusCode = '500';
        response.status.message = "Item not deleted from database";
        logger.error("Item not deleted {{In controller}}");
        res.status(500).json(response);
    });
}

function addToCart(req, res) {
    var response = new Response();
    itemService.addToCart(req.body).
    then((result) => {
        response.data.result = result;
        response.status.statusCode = 200;
        response.status.message = "Item Added to the Cart";
        logger.info("Item Added to cart{{In controller}}");
        res.status(200).json(response);
    }).catch((err) => {
        response.status.statusCode = '500';
        response.status.message = "Item cannot be added to cart Successfully";
        logger.error("Item cannnot be added to cart{{In controller}}");
        res.status(500).json(response);
    });
}

function editCart(req, res) {
    var response = new Response();
    console.log(req.body);
    itemService.editCart(req.body).
    then((result) => {
        response.data.result = result;
        response.status.statusCode = 200;
        response.status.message = "Cart Updated.";
        logger.info("Cart Updated {{In controller}}");
        res.status(200).json(response);
    }).catch((err) => {
        response.status.statusCode = '500';
        response.status.message = "Cart not Updated.";
        logger.error("Cart not Updated {{In controller}}");
        res.status(500).json(response);
    });
}

function getCart(req, res) {
    var response = new Response();
    itemService.getCart(req.params.email).
    then((result) => {
        response.data.result = result;
        response.status.statusCode = 200;
        response.status.message = "Fetched Cart Items.";
        logger.info("Fetched Cart Items {{In controller}}");
        res.status(200).json(response);
    }).catch((err) => {
        response.status.statusCode = '500';
        response.status.message = "Cart Items not fetched.";
        logger.error("Cart items not fetched {{In controller}}");
        res.status(500).json(response);
    });
}

function buyItem(req, res) {
    var response = new Response();
    itemService.buyItem(req.body).
    then((result) => {
        response.data.result = result;
        response.status.statusCode = 200;
        response.status.message = "Ordered Items.";
        logger.info("Ordered Items {{In controller}}");
        res.status(200).json(response);
    }).catch((err) => {
        response.status.statusCode = '500';
        response.status.message = "Item not Ordered.";
        logger.error("Item not Ordered {{In controller}}");
        res.status(500).json(response);
    });
}

function getOrderById(req, res) {
    var response = new Response();
    itemService.getOrderById(req.params.orderId).
    then((result) => {
        response.data.result = result;
        response.status.statusCode = 200;
        response.status.message = "Order by Id fetched from the database";
        logger.info("Order by Id fetched {{In controller}}");
        res.status(200).json(response);
    }).catch((err) => {
        response.status.statusCode = '500';
        response.status.message = "Order by Id not fetched from database";
        logger.error("Order by Id not fetched {{In controller}}");
        res.status(500).json(response);
    });
}

function getAllOrdersOfUser(req, res) {
    var response = new Response();
    itemService.getAllOrdersOfUser(req.params.user).
    then((result) => {
        response.data.result = result;
        response.status.statusCode = 200;
        response.status.message = "All Orders fetched from the database";
        logger.info("All Orders fetched {{In controller}}");
        res.status(200).json(response);
    }).catch((err) => {
        response.status.statusCode = '500';
        response.status.message = "All Orders not fetched from database";
        logger.error("All Orders not fetched {{In controller}}");
        res.status(500).json(response);
    });
}
module.exports = itemController;