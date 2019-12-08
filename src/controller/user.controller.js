var userController = {
    getUserDetails: getUserDetails,
    addUser: addUser,
    editUserDetails: editUserDetails,
    addAddress: addAddress,
    getAddress: getAddress
}
var Response = require('../response');
var userService = require('../service/user.service');
var logger = require('../../logger');

function addUser(req, res) {
    var response = new Response();
    userService.addUser(req.body).
    then((result) => {
        response.data.result = result;
        response.status.statusCode = 200;
        response.status.message = "User Added to the database";
        logger.info("User Added {{In controller}}");
        res.status(200).json(response);
    }).catch((err) => {
        response.status.statusCode = '500';
        response.status.message = "User cannot be added Successfully";
        logger.error("User cannnot be added {{In controller}}");
        res.status(500).json(response);
    });
}

function addAddress(req, res) {
    var response = new Response();
    userService.addAddress(req.body).
    then((result) => {
        response.data.result = result;
        response.status.statusCode = 200;
        response.status.message = "Address Added to the database";
        logger.info("Address Added {{In controller}}");
        res.status(200).json(response);
    }).catch((err) => {
        response.status.statusCode = '500';
        response.status.message = "Address cannot be added Successfully";
        logger.error("Address cannnot be added {{In controller}}");
        res.status(500).json(response);
    });

}

function getAddress(req, res) {
    var response = new Response();
    userService.getAddress(req.params.id).
    then((result) => {
        response.data.result = result;
        response.status.statusCode = 200;
        response.status.message = "Address fetched from the database";
        logger.info("Address fetched {{In controller}}");
        res.status(200).json(response);
    }).catch((err) => {
        response.status.statusCode = '500';
        response.status.message = "Address cannot be fetched Successfully";
        logger.error("Address cannnot be fetched {{In controller}}");
        res.status(500).json(response);
    });

}

function getUserDetails(req, res) {
    console.log(req.params);
    var response = new Response();
    userService.getUserDetails(req.params.email).
    then((result) => {
        response.data.result = result;
        response.status.statusCode = 200;
        response.status.message = "User details fetched from the database";
        logger.info("User details fetched {{In controller}}");
        res.status(200).json(response);
    }).catch((err) => {
        response.status.statusCode = '500';
        response.status.message = "User details not fetched";
        logger.error("User details not fetched {{In controller}}");
        res.status(500).json(response);
    });
}

function editUserDetails(req, res) {
    var response = new Response();
    userService.editUserDetails(req.body).
    then((result) => {
        response.data.result = result;
        response.status.statusCode = 200;
        response.status.message = "User details updated to the database";
        logger.info("User details updated {{In controller}}");
        res.status(200).json(response);
    }).catch((err) => {
        response.status.statusCode = '500';
        response.status.message = "User details cannot be updated Successfully";
        logger.error("User details cannnot be updated {{In controller}}");
        res.status(500).json(response);
    });
}

module.exports = userController;