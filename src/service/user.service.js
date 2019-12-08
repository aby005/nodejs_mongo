var userService = {
    getUserDetails: getUserDetails,
    addUser: addUser,
    editUserDetails: editUserDetails,
    addAddress: addAddress,
    getAddress: getAddress
}
var Response = require('../response');
var userDao = require('../dao/user.dao');
var logger = require('../../logger');
var bcrypt = require('bcryptjs');

function addUser(body) {
    return new Promise((resolve, reject) => {
        var password = body.password;
        body.password = bcrypt.hashSync(password, 10);
        userDao.addUser(body).then(res => {
            logger.info("User Added {{In service}}");
            resolve(res);
        }).catch(err => {
            logger.error("User not Added {{In service}}");
            reject(err);
        });
    });
}

function getUserDetails(req) {
    return new Promise((resolve, reject) => {
        userDao.getUserDetails(req).then(res => {
            logger.info("User fetched {{In service}}");
            resolve(res);
        }).catch(err => {
            logger.error("User not fetched {{In service}}");
            reject(err);
        });
    });
}

function editUserDetails(req) {
    return new Promise((resolve, reject) => {

    });
}

function addAddress(req) {
    return new Promise((resolve, reject) => {
        userDao.addAddress(req).then(res => {
            logger.info("Address added {{In service}}");
            resolve(res);
        }).catch(err => {
            logger.error("Address not added {{In service}}");
            reject(err);
        });
    });
}

function getAddress(id) {
    return new Promise((resolve, reject) => {
        userDao.getAddress(id).then(res => {
            logger.info("Address fetched {{In service}}");
            resolve(res);
        }).catch(err => {
            logger.error("Address not fetched {{In service}}");
            reject(err);
        });
    });
}
module.exports = userService;