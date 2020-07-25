const routes = require('express').Router();

const controller = require('../controllers/client');
const middleware = require('../middleware');

routes.get('/', middleware.authToken, middleware.adminShield, controller.get);
routes.post('/search', middleware.authToken, middleware.adminShield, controller.search);
routes.get('/id/:id', middleware.authToken, controller.getById);
routes.post('/login', middleware.auth, middleware.createTokens, controller.login);
routes.get('/auth', middleware.authToken, controller.auth);
routes.get('/auth_admin', middleware.authToken, middleware.adminShield, controller.authAdmin);
routes.post('/', middleware.encrypt, controller.create);
routes.post('/logout', controller.logout);

module.exports = routes;