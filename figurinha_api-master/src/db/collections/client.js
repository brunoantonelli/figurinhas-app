const db = require('../db');

let Client = undefined;

const createClient = () => {
    Client = db.collection('Client');
    Client.createIndex('email', { unique: true });
}

createClient();

module.exports = Client;