require('dotenv').config();
const mongoose = require('mongoose');

let db = undefined;

const connectDb = async () => {
    mongoose.connect(process.env.DB_URI);
    db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDb connection error:"));
    db ? console.log('Banco de dados conectado') : undefined;
}

connectDb();

module.exports = db;