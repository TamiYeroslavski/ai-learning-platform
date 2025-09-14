// @ts-ignore
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Learning Platform API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.ts'],
};

export default swaggerJSDoc(options);
