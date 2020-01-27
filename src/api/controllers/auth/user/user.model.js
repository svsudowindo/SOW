var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  securityQuestion: {
    type: String,
    required: true
  },
  securityAnswer: {
    type: String,
    required: true
  },
  licenseeNumber: {
    type: String,
    required: true
  },
  businessName: {
    type: String,
    required: true
  },
  shopName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  GA: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    default: (new Date()).getMilliseconds()
  },
  updatedDate: {
    type: Date,
    required: true,
    default: (new Date()).getMilliseconds()
  }
})

var User = mongoose.model('User', UserSchema);

module.exports = User;