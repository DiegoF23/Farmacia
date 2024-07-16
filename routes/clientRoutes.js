const express = require('express');
const router = express.Router();
const clientControllers = require ('../controllers/clientController');

router.get('/clientes',clientControllers.getAllClients);
router.get('/cliente/:id',clientControllers.getClientById);
router.post('/cliente', clientControllers.createClient);
router.put('/cliente/:id',clientControllers.updateClient);
router.delete('/cliente/:id',clientControllers.deleteClient);

module.exports = router;