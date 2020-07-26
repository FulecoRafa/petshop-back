const routes = require('express').Router();

const controller = require('../controllers/order');
const middleware = require('../middleware');

routes.get('/', middleware.authToken, middleware.adminShield, controller.get);
routes.get('/:id', middleware.authToken, controller.getByUser);
routes.post('/', middleware.authToken, controller.create);
routes.put('/:id', middleware.authToken, controller.addProduct);
routes.put('/:id/:status', middleware.authToken, controller.setStatus);

module.exports = routes;