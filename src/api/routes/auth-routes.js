var express = require('express');
var authRoutes = express.Router();

var UserDAO = require('../controllers/auth/user/user.dao');
var MasterDAO = require('../controllers/auth/master/master.dao');
var LoginDAO = require('../controllers/auth/login/login.dao');
var RolesDAO = require('../controllers/auth/roles/roles.dao');

authRoutes.post('/register', UserDAO.createUser);

authRoutes.post('/upload/location-master', MasterDAO.bulkUploadLocationMaster);

authRoutes.post('/upload/master', MasterDAO.bulkUploadMaster);

authRoutes.get('/location-master', MasterDAO.getLoctionMasterData);

authRoutes.get('/master', MasterDAO.getMasterData);

authRoutes.post('/register', UserDAO.createUser);

authRoutes.post('/login', LoginDAO.login);

authRoutes.get('/get-roles', RolesDAO.getRoles);

authRoutes.post('/get-role-id', RolesDAO.getRoleById);

authRoutes.post('/get-users-by-role', UserDAO.getUsersByRole);

authRoutes.post('/create-roles', RolesDAO.createRoles);

exports.authRoutes = authRoutes;
