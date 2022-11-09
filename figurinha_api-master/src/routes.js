const express = require('express');
const routes = express.Router();
const jwt = require('./middlewares/jwt');
const clientController = require('./controllers/clienteController');

routes.post('/v1/client/create-account', clientController.createAccount);

routes.post('/v1/client/send-email-confirm', clientController.sendEmailConf);

routes.get('/v1/client/exist-email', clientController.existEmail);

routes.get('/v1/client/client-active', clientController.clientActive);

routes.post('/v1/client/login', clientController.login);

routes.get('/v1/client/ping', jwt.verifyToken, clientController.ping);

routes.get('/v1/client/logout', jwt.verifyToken, jwt.logout);

routes.post('/v1/client/verify-email', jwt.verifyToken, clientController.verifyEmail);

routes.post('/v1/client/update-password', jwt.verifyToken, clientController.updatePassword);

routes.get('/v1/client/exist-localization', jwt.verifyToken, clientController.existLocalization);

routes.get('/v1/client/info-perfil', jwt.verifyToken, clientController.infoPerfil);

routes.post('/v1/client/update-perfil', jwt.verifyToken, clientController.updatePerfil);

routes.get('/v1/client/stickers', jwt.verifyToken, clientController.getStickers);

routes.post('/v1/clients/update-stickers', jwt.verifyToken, clientController.updateStickers);

module.exports = routes;