const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API to get basic information about contacts'
  },
  host: 'personal-assignmenr-w02.herokuapp.com/contacts',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/contacts.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
