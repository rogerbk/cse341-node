const mongodb = require('../data/database');
const ObjectId =  require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
        const result = await mongodb.getDatabase().db().collection('contacts').find().toArray();

        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'No se encontraron contactos.' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al obtener los contactos:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los contactos.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Users']
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a vali user id to find a contact.');
    }
    try {
        const idParam = req.params.id;

        // Validación del ID
        if (!ObjectId.isValid(idParam)) {
            return res.status(400).json({ message: 'ID inválido.' });
        }

        const userId = new ObjectId(idParam);
        const result = await mongodb.getDatabase().db().collection('contacts').findOne({ _id: userId });

        if (!result) {
            return res.status(404).json({ message: 'Contacto no encontrado.' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al obtener el contacto:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener el contacto.' });
    }
};

const createUser = async (req, res) =>{
    //#swagger.tags = ['Users']
    const user ={
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(user);
    if(response.acknowledged){
        res.status(201).send();
    }else{
        res.status(500).json(response.error || 'Some error occured while updating the user.');
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags = ['Users']
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a vali user id to update a contact.');
    }
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: userId }, user);
    
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a vali user id to delete a contact.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: userId });
    
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
};

module.exports ={
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
}