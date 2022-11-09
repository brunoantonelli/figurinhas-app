const db = require('../db');

let DisabledJWT = undefined;

const createDisabledJwt = () => {
    DisabledJWT = db.collection('DisabledJWT');
    DisabledJWT.createIndex('expire', { type: 'ISODate', expireAfterSeconds: 0 });
}

createDisabledJwt();

module.exports = DisabledJWT;