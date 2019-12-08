var itemService = {
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
var itemDao = require('../dao/item.dao');
var logger = require('../../logger');

function postItem(req) {
    return new Promise((resolve, reject) => {

        itemDao.postItem(req).then(
            result => {
                logger.info("Item Added {{In service}}");
                resolve(result);
            }).catch(err => {
            logger.error("Item not added {{In service}}");
            reject(err);
        });
    });
}

function editItem(req) {
    return new Promise((resolve, reject) => {

        itemDao.editItem(req).then(
            result => {
                logger.info("Item updated {{In service}}");
                resolve(result);
            }).catch(err => {
            logger.error("Item not updated {{In service}}");
            reject(err);
        });
    });
}

function getAllItems() {
    return new Promise((resolve, reject) => {
        itemDao.getAllItems().then(res => {
            logger.info("Recieved Items {{In service}}");
            resolve(res);
        }).catch(err => {
            logger.info("Recieved Items {{In service}}");
            reject(err);
        });
    });
}

function getItem(id) {
    return new Promise((resolve, reject) => {
        itemDao.getItem(id).then(res => {
            logger.info("Item fetched {{In service}}");
            resolve(res);
        }).catch(err => {
            logger.error("Item fetched {{In service}}");
            reject(err);
        });
    });
}

function deleteItem(id) {
    return new Promise((resolve, reject) => {
        itemDao.deleteItem(id).then(res => {
            logger.info("Item Deleted {{In service}}");
            resolve(res);
        }).catch(err => {
            logger.error("Item not deleted {{In service}}");
            reject(err);
        });
    });
}

function addCategory(req) {
    return new Promise((resolve, reject) => {
        itemDao.addCategory(req).then(res => {
            logger.info("Category Added {{In service}}");
            resolve(res);
        }).catch(err => {
            logger.error("Category not Added {{In service}}");
            reject(err);
        });
    });
}

function getCategories() {
    return new Promise((resolve, reject) => {
        itemDao.getCategories().then(res => {
            logger.info("Recieved categories {{In service}}");
            resolve(res);
        }).catch(err => {
            logger.error("Categories not Recieved {{In service}}");
            reject(err);
        });
    });
}

function getItemByCategory(category) {
    return new Promise((resolve, reject) => {
        itemDao.getOneCategory(category).then(res => {
            itemDao.getItemByCategory(res._id).then(
                result => {
                    logger.info("Got Item by category{{In service}}");
                    resolve(result);
                }).catch(err => {
                logger.error("Did not Get Item by category{{In service}}");
                reject(err);
            });
        });

    });
}

function getCart(email) {
    return new Promise((resolve, reject) => {
        itemDao.getCart(email).then(res => {
            logger.info("Got Cart Items {{In service}}");
            resolve(res);
        }).catch(err => {
            logger.error("Did not Get cart Items {{In service}}");
            reject(err);
        });
    });
}

function addToCart(req) {
    return new Promise((resolve, reject) => {

        itemDao.checkIfCartExists(req.userEmail).then(count => {
            if (count > 0) {
                itemDao.getCart(req.userEmail).then(cart => {
                    if (cart.length < 1) {
                        itemDao.addToExistingCart(req).then(res => {
                            logger.info('Added to Cart {{In Service}}');
                            resolve(res);
                        }).catch(err => {
                            logger.error('Not Added to Cart {{In Service}}');
                            console.log(err);
                            reject(err);
                        });
                    } else {
                        reject('Item already exists in Cart.')
                    }
                }).catch(error => {
                    reject(error);
                });

            } else {
                itemDao.addToCart(req).then(res => {
                    logger.info('Added to Cart {{In Service}}');
                    resolve(res);
                }).catch(err => {
                    logger.error('Not Added to Cart {{In Service}}');
                    console.log(err);
                    reject(err);
                });
            }
        });
    });
}

function editCart(req) {
    return new Promise((resolve, reject) => {
        itemDao.editCart(req).then(res => {
            logger.info('Cart updated {{In Service}}');
            resolve(res);
        }).catch(err => {
            logger.error('Cart not updated {{In Service}}');
            reject(err);
        });
    });
}

function buyItem(req) {
    return new Promise((resolve, reject) => {
        itemDao.buyItem(req).then(res => {
            logger.info('Item ordered {{In Service}}');
            resolve(res);
        }).catch(err => {
            logger.error('Item not ordered {{In Service}}');
            reject(err);
        });
    });
}

function getAllOrdersOfUser(email) {
    return new Promise((resolve, reject) => {
        itemDao.getAllOrdersOfUser(email).then(res => {
            logger.info("Recieved All Orders of user {{In service}}");
            resolve(res);
        }).catch(err => {
            logger.error("Not Recieved All Orders of user {{In service}}");
            reject(err);
        });
    });
}

function getOrderById(id) {
    return new Promise((resolve, reject) => {
        itemDao.getOrderById(id).then(res => {
            logger.info("Recieved Order of user {{In service}}");
            resolve(res);
        }).catch(err => {
            logger.error("Not Recieved Order of user {{In service}}");
            reject(err);
        });
    });
}
module.exports = itemService;