/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */

import { Router, Request, Response } from 'express';
import { userAuthSignUp } from '../controllers/userAuthController';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json([{ id: 1, name: 'Dummy User' }]);
});



export default router;
