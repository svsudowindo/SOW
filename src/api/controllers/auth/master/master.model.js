var mongoose = require('mongoose');

var LocationMasterSchema = mongoose.Schema({
    licenseeNumber: {
        type: Number,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    locationName: {
        type: String,
        required: true
    },
    storeName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ''
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
        type: Number,
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

var LocationMaster = mongoose.model('locationMaster', LocationMasterSchema);

module.exports = LocationMaster;