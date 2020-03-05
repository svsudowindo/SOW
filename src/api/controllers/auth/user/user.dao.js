var User = require('./user.model');
var Utils = require('../../../common/services/utils')
var emailService = require('../../../common/email.config/email.config');
var ROLES = require('../../../common/services/app.properties').ROLES;
var Master = require('../master/master.model').master;
var LocationMaster = require('../master/master.model').locationMaster;

exports.createUser = (req, res, next) => {
  let payload = req.body;
  switch (payload.role) {
    case ROLES.MASTER: {
      this.masterCheck(req, res, next);
    }
    case ROLES.LOCATION: {
      this.locationCheck(req, res, next);
    }
    case ROLES.SUPER_ADMIN: {
      this.superAdminCheck(req, res, next);
    }
  }
}

exports.superAdminCheck = (req, res, next) => {
  let payload = req.body;
  var user = new User(payload);
  User.find({ role: payload.role }, (userError, usersList) => {
    if (usersList.length > 0) {
      return res.send(Utils.sendResponse(200, usersList[0], [], 'Super admin exist already.. Please Use the credentials'));
    }
    user.userName = payload.userName;
    user.password = payload.password;
    user.authToken = "admin1234567890";

    user.save((userSaveError, savedUser) => {
      console.log(userSaveError);
      if (userSaveError) {
        if (userSaveError.errors.email) {
          return res.send(Utils.sendResponse(500, null, [userSaveError.errors.email.message], userSaveError.errors.email.message));
        } else {
          return res.send(Utils.sendResponse(500, null, ['Unable to  create User. Please try again'], 'Unable to fetch user. Please try again'));
        }
      }
      if (savedUser.length >= 0) {
        return res.send(Utils.sendResponse(400, null, ['Unauthorized user'], 'Unauthorized user'));
      }
      return res.send(Utils.sendResponse(200, savedUser, [], `${payload.role} Created Successfully`));
    })
  })
}
exports.locationCheck = (req, res, next) => {
  let payload = req.body;
  LocationMaster.find({ licenseeNumber: payload.licenseeNumber }, (locationError, locationRecords) => {
    if (locationError) {
      return res.send(Utils.sendResponse(500, null, ['Unable to  Fetch Location Information.. Please try again'], 'Unable to  Fetch Location Information.. Please try again'));
    }
    if (locationRecords.length > 0) {
      this.saveUser(req, res, next);
    }
  })
}
exports.masterCheck = (req, res, next) => {
  const payload = req.body;
  Master.find({ licenseeNumber: payload.licenseeNumber }, (masterError, masterRecords) => {
    if (masterError) {
      return res.send(Utils.sendResponse(500, null, ['Unable to  Fetch Master Information.. Please try again'], 'Unable to  Fetch Master Information.. Please try again'));
    }
    if (masterRecords.length > 0) {
      this.saveUser(req, res, next);
    } else {
      // if he enters own licencee which does not exists in the syste
    }
  })
}

exports.saveUser = (req, res, next) => {
  let payload = req.body;
  var user = new User(payload);
  User.find({ licenseeNumber: payload.licenseeNumber }, (userError, usersList) => {
    if (userError) {
      return res.send(Utils.sendResponse(500, null, ['Unable to fetch Users. Please try again'], 'Unable to fetch users. Please try again'));
    }
    user.userName = payload.licenseeNumber + '_' + usersList.length;
    user.password = Utils.generatePassword(8);
    user.authToken = Utils.generatePassword(36);
    console.log(user.authToken);

    user.save((userSaveError, savedUser) => {
      console.log(userSaveError);
      if (userSaveError) {
        if (userSaveError.errors.email) {
          return res.send(Utils.sendResponse(500, null, [userSaveError.errors.email.message], userSaveError.errors.email.message));
        } else {
          return res.send(Utils.sendResponse(500, null, ['Unable to  create User. Please try again'], 'Unable to fetch user. Please try again'));
        }
      }
      if (savedUser.length >= 0) {
        return res.send(Utils.sendResponse(400, null, ['Unauthorized user'], 'Unauthorized user'));
      }
      let emailBody = {
        email: user.email,
        password: user.password
      };
      emailService.sendMail(emailBody, 'Registration with SOW', 'You have registered with SOW', 'Please Use following credentials to login', true);
      return res.send(Utils.sendResponse(200, savedUser, [], 'User Saved Successfully'));
    })
  })
}


/**
 * Get Users by role if only super admin
 */

exports.getUsersByRole = (req, res, next) => {
  const payload = req.body;
  if (payload.loggedInRole === 'SUPER_ADMIN') {
    User.find({role: payload.role}, (userError, userList) => {
      if (userError) {
        return res.send(Utils.sendResponse(500, null, [`Unable to get the  ${payload.role} Information... Please try again later`], `Unable to get the  ${payload.role} Information... Please try again later`));
      }
      if (userList.length <= 0) {
        return res.send(Utils.sendResponse(200, [], [], `No  ${payload.role} found ... `));
      }
      const filterdUserList = JSON.parse(JSON.stringify(userList)).map(obj => {
        delete obj.password;
        delete obj.authToken;
        return obj;
      });
      return res.send(Utils.sendResponse(200, filterdUserList, [], `${payload.role} Information Fetched Successfully`));
    })
  } else {
    return res.send(Utils.sendResponse(401, null, ['Unauthorized User ... Please Try with an authorized User'], 'Unauthorized User ... Please Try with an authorized User'));
  }
}