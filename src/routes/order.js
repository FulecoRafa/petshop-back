const routes = require('express').Router();

const controller = require('../controllers/order');
const middleware = require('../middleware');

routes.get('/', middleware.authToken, middleware.adminShield, controller.get);
routes.post('/', middleware.authToken, controller.create);
routes.put('/:id/:status', middleware.authToken, controller.setStatus);

module.exports = routes;