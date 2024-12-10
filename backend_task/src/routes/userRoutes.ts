import { Router } from 'express';
import { userAuthSignUp, verifyOtp } from '@/controllers/userAuthController';
import { commonLoginController } from './commonLoginController';
import { bookSpeakerController, speakerViewController } from '@/controllers/userViewBookController';
import { authMiddleware } from '@/middlewares/authMiddleware';

const router: Router = Router();

// Swagger documentation for POST /users/signup
/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: User sign-up
 *     description: Creates a new user with the provided details and sends OTP for verification.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's first name
 *               lastName:
 *                 type: string
 *                 description: The user's last name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 description: The user's password
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User successfully created and OTP sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "User created successfully. Please verify your email."
 *       400:
 *         description: Missing required inputs or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMsg:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMsg:
 *                   type: string
 */
router.post('/signup', userAuthSignUp);

/**
 * @swagger
 * /users/verifyOtp:
 *   post:
 *     summary: Verify OTP
 *     description: Verifies the OTP sent to the user's email to complete the registration process.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address
 *               otp:
 *                 type: string
 *                 description: The OTP sent to the user's email
 *             required:
 *               - email
 *               - otp
 *     responses:
 *       200:
 *         description: OTP successfully verified, user is now verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "OTP verified successfully, user is now verified"
 *       400:
 *         description: OTP has expired or is invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMsg:
 *                   type: string
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMsg:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMsg:
 *                   type: string
 */
router.post('/verifyOtp', verifyOtp);

router.post('/login', commonLoginController);

router.get('/list-speakers',authMiddleware,speakerViewController)

router.post('/book',authMiddleware,bookSpeakerController)
export default router;