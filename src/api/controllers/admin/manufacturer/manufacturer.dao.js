var ManufacturerModal = require('./manufacturer.model');
var Utils = require('./../../../common/services/utils');

/**
 * Create a manufacturer
 */
exports.createManufacturer = (req, res, next) => {
    const payload = req.body;
    ManufacturerModal.find({email: payload.email}, (manufacturerError, manufacturerResult) => {
        if (manufacturerError) {
            if (manufacturerResult.errors.email) {
                return res.send(Utils.sendResponse(500, null, [manufacturerResult.errors.email.message], 'Manufacturer already exist.'));
              } else {
                return res.send(Utils.sendResponse(500, null, ['Unable to  create User. Please try again'], 'Unable to fetch user. Please try again'));
              }
        }
        if (manufacturerResult.length > 0) {
          return res.send(Utils.sendResponse(409, null, ['Manufacturer already exist'], 'Manufacturer already exist'));
        }
        var manufacturer = new ManufacturerModal(payload);
        manufacturer.save((saveError, manufacturerSaveResult) => {
            if (saveError) {
                return res.send(Utils.sendResponse(500, null, ['Unable to create Manufacturer. Please try again'], 'Unable to create Manufacturer. Please try again'));
            }
            console.log(manufacturerSaveResult);
            if (manufacturerSaveResult) {
                return res.send(Utils.sendResponse(200, manufacturerSaveResult, [], 'Manufacturer Created Successfully'));
            }
        })

    })
}


/**
 * Get All Manufacturer 
 */
exports.getAllManufacturer = (req, res, next) => {
    ManufacturerModal.find({}, (getManufacturerError, getManufacturerResult) => {
        if (getManufacturerError) {
            return res.send(Utils.sendResponse(500, null, ['Something went wrong while fetching Manufacturer... Please try again'], 'Something went wrong while fetching Manufacturer... Please try again'));
        }
        if (getManufacturerResult.length >= 0) {
            return res.send(Utils.sendResponse(200, getManufacturerResult, [], 'Manufacturer Fetched successfully'));
        }
    })
}

/**
 * Get Manufacturer by using manufacturer ID
 */
exports.getAllManufacturerByID = (req, res, next) => {
    const manufacturerID = req.params.id;
    ManufacturerModal.find({_id: manufacturerID}, (manufactureError, manufactureResult) => {
        if (manufactureError) {
            return res.send(Utils.sendResponse(500, null, ['Something went wrong while fetching Manufatcurer... Please try again'], 'Something went wrong while fetching Manufatcurer... Please try again')); 
        }
        if (manufactureResult.length <= 0) {
            return res.send(Utils.sendResponse(400, null, ['No manufacturer exist'], 'No manufacturer exist')); 
        }
        return res.send(Utils.sendResponse(200, manufactureResult, [], 'Manufacturer Details Fetched Successfully')); 
    })
}

/**
 * Get List of Cabinets by manufacturer ID
 */
exports.getCabinetsByManufacturerID = (req, res, next) => {
    const manufacturerID = req.params.id;
    ManufacturerModal.find({_id: manufacturerID}, (manufactureError, manufactureResult) => {
        if (manufactureError) {
            return res.send(Utils.sendResponse(500, null, ['Something went wrong while fetching Manufatcurer... Please try again'], 'Something went wrong while fetching Manufatcurer... Please try again')); 
        }
        if (manufactureResult.length <= 0) {
            return res.send(Utils.sendResponse(400, null, ['No manufacturer exist'], 'No manufacturer exist')); 
        }
        const obj = {
            id: manufactureResult[0]._id,
            name: manufactureResult[0].name,
            email: manufactureResult[0].email,
            cabinets: manufactureResult[0].cabinets
        }
        return res.send(Utils.sendResponse(500, obj, [], 'Manufacturer Details Fetched Successfully')); 
    })
}


/**
 * Get List of Games by manufacturer ID
 */
exports.getGamesByManufacturerID = (req, res, next) => {
    const manufacturerID = req.params.id;
    ManufacturerModal.find({_id: manufacturerID}, (manufactureError, manufactureResult) => {
        if (manufactureError) {
            return res.send(Utils.sendResponse(500, null, ['Something went wrong while fetching Manufatcurer... Please try again'], 'Something went wrong while fetching Manufatcurer... Please try again')); 
        }
        if (manufactureResult.length <= 0) {
            return res.send(Utils.sendResponse(400, null, ['No manufacturer exist'], 'No manufacturer exist')); 
        }
        const obj = {
            id: manufactureResult[0]._id,
            name: manufactureResult[0].name,
            email: manufactureResult[0].email,
            games: manufactureResult[0].games
        }
        return res.send(Utils.sendResponse(500, obj, [], 'Manufacturer Details Fetched Successfully')); 
    })
}

/**
 * Update Manufacturer by manufacturer ID and Manufacturer Email
 */
exports.updateManufacturer = (req, res, next) => {
    const payload = req.body;
    ManufacturerModal.find({_id: payload._id}, (manufactureError, manufactureResult) => {
        if (manufactureError) {
            return res.send(Utils.sendResponse(500, null, ['Something went wrong while fetching Manufatcurer... Please try again'], 'Something went wrong while fetching Manufatcurer... Please try again')); 
        }
        if (manufactureResult.length <= 0) {
            return res.send(Utils.sendResponse(400, null, ['No manufacturer exist'], 'No manufacturer exist')); 
        }
        ManufacturerModal.update({_id: payload._id, email: payload.email}, payload, (updateError, updateResult) => {
            console.log(updateError);
            if (updateError) {
                return res.send(Utils.sendResponse(500, null, ['Something went wrong while Updating Manufatcurer... Please try again'], 'Something went wrong while  Updating Manufatcurer... Please try again')); 
            }
            if (updateResult.nModified === 1) {
                return res.send(Utils.sendResponse(200, payload, [], 'Manufacturer Updated Successfully')); 
            } else {
                return res.send(Utils.sendResponse(500, null, ['Something went wrong while Updating Manufatcurer... Please try again'], 'Something went wrong while  Updating Manufatcurer... Please try again')); 
            }
        })
    })
}