var mongoose = require('mongoose');

var LoginSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  companyID: {
    type: String,
    required: true
  }
});

var Login = mongoose.model('login', LoginSchema);

module.exports = Login;
