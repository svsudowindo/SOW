var RequestMachineModal = require('./reqestMachine.modal');
var ManufacturerModal = require('../manufacturer/manufacturer.model');
var Utils = require('../../../common/services/utils');
var LocationModal = require('../../auth/master/master.model').locationMaster;
var UsersModal = require('../../auth/user/user.model');
var APP_PROPERTIES = require('../../../common/services/app.properties');

/**
 * Request for new Machine to particular location
 */
exports.requestMachine = (req, res, next) => {
    const authToken = req.get('Authorization');
    const payload = req.body;

    UsersModal.find({authToken: authToken}, (userError, userDetails) => {
        if (userError) {
            return res.send(Utils.sendResponse(500, null, ['Something went wrong in while fetching User information'], 'Something went wrong in while fetching User information'));
        }
        if (userDetails.length <= 0) {
            return res.send(Utils.sendResponse(404, null, ['Unauthorized User... Please try again'], 'Unauthorized User... Please try again'));
        }
        const userInfo = {
            name: userDetails[0].firstName + ' ' + userDetails[0].lastName,
            id: userDetails[0]._id
        };
        payload.requestedBy = userInfo; 
        // return;
        ManufacturerModal.find({_id: payload.manufacturer.id}, (manufacturerError, manufacturerResult) => {
            if (manufacturerError) {
                return res.send(Utils.sendResponse(500, null, ['Something went wrong in fetching manufacturer details'], 'Something went wrong in fetching manufacturer details'));
            }
            console.log(manufacturerResult);
            if (manufacturerResult.length <= 0) {
                return res.send(Utils.sendResponse(404, null, ['Selected Manufacturer does not Exist'], 'Selected Manufacturer does not Exist'));
            }
            LocationModal.find({_id: payload.location.id}, (locationError, locationResult) => {
                if (locationError) {
                    return res.send(Utils.sendResponse(500, null, ['Something went wrong in fetching location details'], 'Something went wrong in fetching location details'));
                }
                if (locationResult <= 0) {
                    return res.send(Utils.sendResponse(404, null, ['Selected Location does not Exist'], 'Selected Location does not Exist'));
                }
                const requestObj = new RequestMachineModal(payload);
                requestObj.save((saveError, saveResult) => {
                    if (saveError) {
                        return res.send(Utils.sendResponse(500, null, ['Something went wrong in while saving the request'], 'Something went wrong in while saving the request'));
                    }
                    console.log(saveResult);
                    return res.send(Utils.sendResponse(200, saveResult, [], 'Request sent Successfully'));
                })
            })
        })
    })

}

/**
 * Get All the requests made for request
 */
exports.getAllMachinesRequsted = (req, res, next) => {
    const authToken = req.get('Authorization');
    UsersModal.find({authToken: authToken, role: APP_PROPERTIES.ROLES.SUPER_ADMIN}, (userError, userDetails) => {
        if (userError) {
            return res.send(Utils.sendResponse(500, null, ['Something went wrong in while fetching User information'], 'Something went wrong in while fetching User information'));
        }
        if (userDetails.length <= 0) {
            return res.send(Utils.sendResponse(404, null, ['Unauthorized User... Please try again'], 'Unauthorized User... Please try again'));
        }
        RequestMachineModal.find({}, (requestErrors, requestMachinesList) => {
            if (requestErrors) {
                return res.send(Utils.sendResponse(500, null, ['Something went wrong in while fetching Machine Requests'], 'Something went wrong in while fetching Machine Requests'));
            }
            return res.send(Utils.sendResponse(200, requestMachinesList, [], 'Requests Fetched successfully'));
        })
    })
}