export const RequestEnums = {
    REGISTER_USER: {
        type: 'POST',
        path: '/auth/register',
        keys: [],
        values: []
    },
    UPLOAD_MASTER_DATA: {
        type: 'POST',
        path: '/auth/upload/master',
        keys: [],
        values: []
    },
    UPLOAD_LOCATION_MASTER: {
        type: 'POST',
        path: '/auth/upload/location-master',
        keys: [],
        values: []
    },
    UPLOAD_ROLES: {
        type: 'POST',
        path: '/auth/create-roles',
        keys: [],
        values: []
    },
    GET_LOCATION_MASTER: {
        type: 'GET',
        path: '/auth/location-master',
        keys: [],
        values: []
    },
    GET_MASTER: {
        type: 'GET',
        path: '/auth/master',
        keys: [],
        values: []
    },
    LOGIN: {
        type: 'POST',
        path: '/auth/login',
        keys: [],
        values: []
    },
    GET_ROLES: {
        type: 'GET',
        path: '/auth/get-roles',
        keys: [],
        values: []
    },
    GET_MANUFACTURERS: {
        type: 'GET',
        path: '/admin/get-manufacturer',
        keys: [],
        values: []
    },
    POST_MANUFACTURERS: {
        type: 'POST',
        path: '/admin/create-manufacturer',
        keys: [],
        values: []
    },
    GET_MANUFACTURER_BY_ID: {
        type: 'GET',
        path: '/admin/get-manufacturer-by-id/:vendorID',
        keys: ['vendorID'],
        values: []
    },
    UPDATE_MANUFACTURER: {
        type: 'POST',
        path: '/admin/update-manufacturer',
        keys: [],
        values: []
    },
    POST_MACHINE_REQUEST: {
        type: 'POST',
        path: '/admin/request-new-machine',
        keys: [],
        values: []
    },
    GET_MACHINE_REQUEST: {
        type: 'GET',
        path: '/admin/get-all-machine-requests',
        keys: [],
        values: []
    },
};

