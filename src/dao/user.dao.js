var userDao = {
    getUserDetails: getUserDetails,
    addUser: addUser,
    editUserDetails: editUserDetails,
    addAddress: addAddress,
    getAddress: getAddress
}
var Response = require('../response');
var logger = require('../../logger');
var User = require('../models/user');
var Address = require('../models/address');

function addUser(userData) {
    return new Promise((resolve, reject) => {
        userData.role = 'User';
        var user = new User(userData);
        User.findOne({
            'email': userData.email
        }, function (err, exists) {
            if (err)
                reject('Error somewhere on the Server.');
            if (exists) {
                logger.error('User already Exists {{In Dao}}');
                reject('User already exists.');
            } else {
                user.save((err, savedUser) => {
                    if (!err) {
                        logger.info('User added {{In Dao}}');
                        resolve(savedUser);
                    } else {
                        logger.error('User not added {{In Dao}}');
                        reject('User Not saved');
                    }

                });
            }
        });
    });
}

function getUserDetails(email) {
    return new Promise((resolve, reject) => {
        User.findOne({
            'email': email
        }, (err, user) => {
            if (!err) {
                logger.info('User fetched {{In Dao}}');
                resolve(user);
            } else {
                logger.error('User not fetched {{In Dao}}');
                reject(err);
            }
        });
    });

}

function editUserDetails(req) {
    return new Promise((resolve, reject) => {

    });
}

function addAddress(req) {
    return new Promise((resolve, reject) => {
        var addressObj = {};
        addressObj.addressLine1 = req.addressLine1;
        addressObj.addressLine2 = req.addressLine2;
        addressObj.city = req.city;
        addressObj.state = req.state;
        addressObj.pincode = req.pincode;
        addressObj.mobile = req.mobile;
        var address = new Address(addressObj);
        address.save((err, insertedData) => {
            if (!err) {
                logger.info('Address added {{In Dao}}');
                resolve(insertedData);
            } else {
                logger.error('Address not added {{In Dao}}');
                reject('Address Not saved');
            }
        });
    });
}

function getAddress(_id) {
    return Address.findOne({
        '_id': _id
    });
}
module.exports = userDao;