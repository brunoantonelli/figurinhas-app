require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./db/db');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: 'true', limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(routes);

app.listen(process.env.PORT, () => { console.log(`Server is Running on port: ${process.env.PORT}`) });