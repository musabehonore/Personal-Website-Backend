// import { Express, Request, Response } from "express";
// import swaggerJsdoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
// import { version } from '../../package.json';
// import log from './logger';

// const options: swaggerJsdoc.Options = {
//   definition: {
//     opeapi: "3.0.0",
//     info: {
//       title: 'My Brand REST API ',
//       version
//     },
//     components: {
//       securitySchemas: {
//         bearerAuth: {
//           type: 'http',
//           scheme: 'bearer',
//           bearerFormat: 'JWT',
//         },
//       },
//     },
//     security: [
//       {
//         bearerAuth: [],
//       }
//     ]
//   },
//   apis: ["../routes/routes ", "../models/*.ts"],
// };

// const swaggerSpec = swaggerJsdoc(options)

// function swaggerDocs(app: Express, port: number) {
//   app.use('/blogs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//   app.get("docs.json", (req: Request, res:Response) =>{
//     res.setHeader("Content-Type", "application/json");
//     res.send(swaggerSpec);
//   });

//   console.log(`Blogs available at http://localhost:${port}/blogs`);

// }


// export default swaggerDocs;


import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MyBrand API',
      version: '1.0.0',
      description: 'MyBrand API information',
      contact: {
        email: '@gmail.com',
      },
      // servers: ["http://localhost:3000"],
    },
    components: {
      securitySchemes: {
        BearerAuth: { 
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', 
        },
      },
    },
    // security: [{ BearerAuth: [] }], 
  },
  apis: ['./src/routes/routes.ts'],  //hhhh
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const swaggerUiMiddleware = swaggerUi.serve;
export const swaggerUiSetup = swaggerUi.setup(swaggerDocs, {
  swaggerOptions: {
    security: [{ BearerAuth: [] }], 
  },
});