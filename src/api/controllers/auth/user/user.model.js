var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  userName: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    required: true
  },
  // securityQuestion: {
  //   type: String,
  //   required: true
  // },
  // securityAnswer: {
  //   type: String,
  //   required: true
  // },
  licenseeNumber: {
    type: Number,
    required: true
  },
  businessName: {
    type: String,
    required: true
  },
  locationName: {
    type: String
  },
  storeName: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  authToken: {
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

UserSchema.plugin(uniqueValidator);
var User = mongoose.model('User', UserSchema);

module.exports = User;