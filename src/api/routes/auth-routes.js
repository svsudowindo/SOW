var express = require('express');
var authRoutes = express.Router();

var UserDAO = require('../controllers/auth/user/user.dao');
var MasterDAO = require('../controllers/auth/master/master.dao');

authRoutes.post('/register', UserDAO.createUser);

authRoutes.post('/upload/location-master', MasterDAO.bulkUploadLocationMaster);

authRoutes.post('/upload/master', MasterDAO.bulkUploadMaster);

authRoutes.get('/location-master', MasterDAO.getLoctionMasterData);

authRoutes.get('/master', MasterDAO.getMasterData);

exports.authRoutes = authRoutes;
