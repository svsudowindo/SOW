var express = require('express');
var adminRoutes = express.Router();

var manufacturerDAO = require('../controllers/admin/manufacturer/manufacturer.dao');

adminRoutes.post('/create-manufacturer', manufacturerDAO.createManufacturer);

adminRoutes.get('/get-manufacturer', manufacturerDAO.getAllManufacturer);

adminRoutes.get('/get-manufacturer-by-id/:id', manufacturerDAO.getAllManufacturerByID);

adminRoutes.get('/get-cabinets-by-manufacturer-id/:id', manufacturerDAO.getCabinetsByManufacturerID);

adminRoutes.get('/get-games-by-manufacturer-id/:id', manufacturerDAO.getGamesByManufacturerID);

adminRoutes.post('/update-manufacturer', manufacturerDAO.updateManufacturer);


exports.adminRoutes = adminRoutes;
