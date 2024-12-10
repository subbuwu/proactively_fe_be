import express from 'express'
import dotenv from 'dotenv'
import { Request,Response } from 'express';
import morgan from 'morgan'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import userRoutes from '@/routes/userRoutes'
import speakerRoutes from '@/routes/speakerRoutes'
import { swaggerOptions } from './config/swagger';

dotenv.config();

const app = express();
const port = process.env.PORT;
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.json())
app.use(morgan('tiny'))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req : Request, res : Response) => {
  res.send('Proactively Backend Task');
});

app.use('/users',userRoutes)
app.use('/speakers',speakerRoutes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});