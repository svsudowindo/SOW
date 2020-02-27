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
  }
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
