const express = require('express');
const router = express.Router();

//const router = require('express').Router;

const userController = require('../controllers/users');
const {isAuthenticated} = require("../middleware/authenticate");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json'); 
//const validation = require('../middleware/validate');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle);

router.post('/', isAuthenticated, userController.createUser);

router.put('/:id', isAuthenticated, userController.updateUser);

router.delete('/:id',isAuthenticated, userController.deleteUser);

module.exports =router;