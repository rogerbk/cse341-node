const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json'); 

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle);

router.post('/', userController.createUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports =router;