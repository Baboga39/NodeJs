const swaggerJSDoc = require('swagger-jsdoc');
const authDefinitions = require('./swagger-definitions');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'KeyHub API Documentation',
      version: '1.0.0',
      description: 'API documentation for KeyHub Node project',
    },
    servers: [
      {
        url: 'https://keyhubsocialmedia.onrender.com',
        description: 'Production server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Local development server',
      },
    ],
    paths: authDefinitions.paths,
  },
  apis: [], // Không cần chỉ định file API vì chúng ta đã nhập paths trực tiếp.
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
module.exports = swaggerDocs;
