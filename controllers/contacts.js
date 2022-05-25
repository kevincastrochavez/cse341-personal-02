const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('contacts').find();

    result.toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }

      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getContact = async (req, res) => {
  try {
    const urlId = new ObjectId(req.params.id);

    const result = await mongodb.getDb().db().collection('contacts').find({ _id: urlId });

    result.toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }

      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(`An error occurred creating a contact: ${response.error}`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .replaceOne({ _id: userId }, contact);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(`An error occurred updating a contact: ${response.error}`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .remove({ _id: userId }, true);

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(`An error occurred deleting a contact: ${response.error}`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
};
