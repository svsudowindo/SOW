
var LocationMaster = require('./master.model').locationMaster;
var Master = require('./master.model').master;

var Utils = require('../../../common/services/utils');
/**
 * Bulk upload location master data
 */
exports.bulkUploadLocationMaster = function(req, res, next) {
    let payload = req.body;
    var locationMaster = new LocationMaster();
    locationMaster = payload.obj;
    LocationMaster.insertMany(locationMaster, (error, locationRecords) => {
        if (error) {
            return res.send(Utils.sendResponse(500, null, ['Something went wrong. Please try again'], 'Something went wrong. Please try again'));
        }
        if(locationRecords.length <= 0) {
            return res.send(Utils.sendResponse(500, null, ['No records Inserted. Please try again'], 'No records Inserted. Please try again'));
        }
        return res.send(Utils.sendResponse(200, 'success', [], locationRecords.length + ' Records Uploaded Successfully'));
    })
}

/**
 * Bulk upload master data
 */
exports.bulkUploadMaster = function(req, res, next) {
    let payload = req.body;
    var master = new Master();
    master = payload.obj;
    Master.insertMany(master, (error, masterRecords) => {
        if (error) {
            return res.send(Utils.sendResponse(500, null, ['Something went wrong. Please try again'], 'Something went wrong. Please try again'));
        }
        if(masterRecords.length <= 0) {
            return res.send(Utils.sendResponse(500, null, ['No records Inserted. Please try again'], 'No records Inserted. Please try again'));
        }
        return res.send(Utils.sendResponse(200, 'success', [], masterRecords.length + ' Records Uploaded Successfully'));
    })
}