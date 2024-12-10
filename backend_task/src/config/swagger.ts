
export const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Proactively Backend Task - Subramanian - nsubbu2004@gmail.com',
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT', 
          },
        },
      },
      security: [
        {
          bearerAuth: [], 
        },
      ],
    },
    apis: [
      './src/routes/*.ts', // Path to the API route files
    ],
  };
  