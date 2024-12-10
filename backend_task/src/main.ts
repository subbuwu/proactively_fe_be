import express from 'express'
import dotenv from 'dotenv'
import { Request,Response } from 'express';
import morgan from 'morgan'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import userRoutes from '@/routes/userRoutes'
import speakerRoutes from '@/routes/speakerRoutes'

dotenv.config();
const app = express();

const port = process.env.PORT;
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Proactively Backend Task - Subramanian - nsubbu2004@gmail.com',
        version: '1.0.0',
      },
    },
    apis: [
        './src/routes/*.ts',  
        './src/routes/*.js'   
      ], 
  };
  
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.json())
app.use(morgan('tiny'))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req : Request, res : Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/users',userRoutes)
app.use('/speakers',speakerRoutes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});