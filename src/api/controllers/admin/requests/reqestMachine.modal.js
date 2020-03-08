var mongoose = require('mongoose');
var APP_PROPERIES = require('../../../common/services/app.properties');
var requestMachineSchema = mongoose.Schema({
    manufacturer: {
        name: {
            type: String
        },
        id: {
            type: String
        }
    },
    cabinet: {
        name: {
            type: String
        },
        id: {
            type: String
        }
    },
    billAcceptor: {
        name: {
            type: String
        },
        id: {
            type: String
        }
    },
    game: {
        name: {
            type: String
        },
        id: {
            type: String
        }
    },
    location: {
        businessName: {
            type: String
        },
        id: {
            type: String
        }
    },
    status: {
        type: String,
        default: APP_PROPERIES.REQUEST_MACHINE_STATUS.OPEN
    },
    assignedTo: {
        id: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        }
    },
    requestedBy: {
        id: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        }
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

var RequestMachine = mongoose.model('requestMachine', requestMachineSchema);

module.exports = RequestMachine;