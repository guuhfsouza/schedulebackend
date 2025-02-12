const express = require('express');


const UserController = require('./controllers/UserController');
const ProfileController = require('./controllers/ProfileController');
const ServiceController = require('./controllers/ServiceController');
const ScheduleController = require('./controllers/ScheduleController');
const ProfileScheduleController = require('./controllers/ProfileScheduleController');
const ServicesActiveController = require('./controllers/ServicesActive');
const AuthenticationUser = require('./controllers/AuthenticationUser');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.put('/users', UserController.update);

routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.create);
routes.put('/profile', ProfileController.update);

routes.get('/services', ServiceController.index);
routes.post('/services', ServiceController.create);
routes.put('/services', ServiceController.update);

routes.get('/schedules', ScheduleController.index);
routes.post('/schedules', ScheduleController.create);
routes.put('/schedules', ScheduleController.update);

routes.get('/profile-schedule', ProfileScheduleController.index);

routes.get('/services-active', ServicesActiveController.index);

routes.get('/authentication', AuthenticationUser.index);
routes.put('/authentication', AuthenticationUser.update);

module.exports = routes;