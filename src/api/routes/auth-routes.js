var express = require('express');
var authRoutes = express.Router();

var UserDao = require('../controllers/auth/user/user.dao');

authRoutes.post('/register', UserDao.createUser);

exports.authRoutes = authRoutes;
