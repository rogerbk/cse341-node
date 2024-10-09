const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json'); 
const validation = require('../middleware/validate');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle);

router.post('/', validation.saveContact, userController.createUser);

router.put('/:id', validation.saveContact, userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports =router;