const routes = require('express').Router();

const controller = require('../controllers/scheduling');
const middleware = require('../middleware');

routes.post('/times', controller.getByTimes);
routes.get('/:id', middleware.authToken, controller.getById);
routes.post('/', middleware.authToken, controller.create);

module.exports = routes;