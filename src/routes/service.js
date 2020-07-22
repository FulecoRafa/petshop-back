const routes = require('express').Router();

const controller = require('../controllers/service');
const middleware = require('../middleware');

routes.get('/', middleware.authToken, controller.get);
routes.get('/slug/:slug', middleware.authToken, controller.getBySlug);
routes.get('/id/:id', middleware.authToken, controller.getById);
routes.get('/partner', middleware.authToken, controller.getPartnerHours);
routes.post('/', middleware.authToken, middleware.adminShield, controller.create);
routes.put('/:id', middleware.authToken, middleware.adminShield, controller.update);
routes.delete('/:id', middleware.authToken, middleware.adminShield, controller.delete);

module.exports = routes;