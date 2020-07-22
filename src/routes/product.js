const routes = require('express').Router();

const controller = require('../controllers/product');
const middleware = require('../middleware');

routes.get('/', middleware.authToken, controller.get);
routes.get('/search', middleware.authToken, controller.getBySlug);
routes.get('/id/:id', middleware.authToken, controller.getById);
routes.post('/', middleware.authToken, middleware.adminShield, controller.create);
routes.put('/:id', middleware.authToken, middleware.adminShield, controller.update);
routes.delete('/:id', middleware.authToken, middleware.adminShield, controller.delete);

module.exports = routes;