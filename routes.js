const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const characterController = require('./src/controllers/characterController');
const loginController = require('./src/controllers/loginController');
const logController = require('./src/controllers/logController');

const {loginRequired} = require('./src/middlewares/middleware')
const {logRequests} = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeController.paginaInicial, logRequests);
route.post('/page', homeController.paginaInicialPage, logRequests);

//rotas de login
route.get('/login', loginController.index, logRequests);
route.get('/login/logout', loginController.logout, logRequests);
route.post('/login/register', loginController.register, logRequests);
route.post('/login/login', loginController.login, logRequests);

//rotas da log
route.get('/showlog',loginRequired, logController.showLog);

//rotas dos characters
route.post('/search', characterController.trataSearch, logRequests);
route.get('/:id', characterController.details, logRequests);


module.exports = route;
