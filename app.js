const express = require('express');
const mongodb = require('./db/connect');
const contactsRoutes = require('./routes/contacts');

const port = process.env.PORT || 8080;
const app = express();

app.use('/contacts', contactsRoutes);

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
