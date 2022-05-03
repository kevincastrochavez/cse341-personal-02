const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getContact);
router.post('/', contactsController.createContact);
router.put('/:id', contactsController.updateContact);

module.exports = router;
