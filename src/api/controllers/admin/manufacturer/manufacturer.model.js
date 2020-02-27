var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var ManufacturerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  cabinets: [{
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: ''
    },
    monitorType: {
      type: String,
      default: ''
    },
    billAcceptor: [{
      name: {
        type: String,
        required: true
      }
    }]
  }],
  games: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  }],
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

var Manufacturer = mongoose.model('manufacturer', ManufacturerSchema);

module.exports = Manufacturer;