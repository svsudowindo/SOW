var Roles = require('../roles/roles.model');
var Utils = require('../../../common/services/utils');

/**
 * Get All the roles
 */
exports.getRoles = (req, res, next) => {
    Roles.find({}, (rolesError, rolesArr) => {
        if (rolesError) {
            return res.send(Utils.sendResponse(500, null, ['Unable to fetch Roles.. Please try again'], 'Unable to fetch Roles.. Please try again'));
        }
        return res.send(Utils.sendResponse(200, rolesArr, [], 'Fetched Roles Successfully'));
    })
}

/**
 * Get role by role_id
 */
exports.getRoleById = (req, res, next) => {
    let payload = req.body;
    console.log(payload);
    Roles.find({role_id: payload.role_id}, (roleError, role) => {
        if (roleError) {
            return res.send(Utils.sendResponse(500, null, ['Unable to fetch Role.. Please try again'], 'Unable to fetch Role.. Please try again'));
        }
        return res.send(Utils.sendResponse(500, role, [], 'Role Details'));
    })
}

