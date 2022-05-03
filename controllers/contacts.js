const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
  const result = await mongodb.getDb().db().collection('contacts').find();

  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getContact = async (req, res) => {
  const urlId = new ObjectId(req.params.id);

  const result = await mongodb.getDb().db().collection('contacts').find({ _id: urlId });

  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res) => {
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
    res.status(500).json(`An error occurred: ${response.error}`);
  }
};

module.exports = { getAllContacts, getContact, createContact };
