var mongoose = require('mongoose');

var LoginSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

var Login = mongoose.model('login', LoginSchema);

module.exports = Login;
