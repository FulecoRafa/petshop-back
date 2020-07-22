const routes = require('express').Router();

const controller = require('../controllers/pet');
const middleware = require('../middleware');

routes.get('/client', middleware.authToken, controller.getByClient);
routes.get('/:id', middleware.authToken, controller.getById);
routes.post('/', middleware.authToken, controller.create);
routes.put('/:id', middleware.authToken, controller.update);
routes.delete('/:id', middleware.authToken, controller.delete);

module.exports = routes;