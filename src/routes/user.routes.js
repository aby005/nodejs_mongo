var express = require('express');
var app = express.Router();
var userController = require('../controller/user.controller');

app.post('/signup', userController.addUser);
app.get('/get-user-details/:email', userController.getUserDetails);
app.put('/edit-user', userController.editUserDetails);
app.post('/add-address', userController.addAddress);
app.get('/get-address/:id', userController.getAddress);
module.exports = app;