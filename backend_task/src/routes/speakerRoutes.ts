import { Router } from 'express';
import { speakerAuthSignUp } from '@/controllers/speakerAuthController';  // Assuming you have a controller for auth
import { verifyOtp } from '@/controllers/userAuthController';
import { commonLoginController } from './commonLoginController';
import { speakerProfileSetupController } from '@/controllers/speakerProfileSetupController';
import { authMiddleware } from '@/middlewares/authMiddleware';

const router: Router = Router();

// Swagger documentation for POST /speakers/signup
/**
 * @swagger
 * /speakers/signup:
 *   post:
 *     summary: Speaker User sign-up
 *     description: Creates a new speaker user with the provided details and sends OTP for verification.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The speaker user's first name
 *               lastName:
 *                 type: string
 *                 description: The speaker user's last name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The speaker user's email address
 *               password:
 *                 type: string
 *                 description: The speaker user's password
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
 *                   example: "Speaker User created successfully. Please verify your email."
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
router.post('/signup', speakerAuthSignUp);


// Swagger documentation for POST /speakers/verifyOtp
/**
 * @swagger
 * /speaker/verifyOtp:
 *   post:
 *     summary: Verify OTP
 *     description: Verifies the OTP sent to the speaker user's email to complete the registration process.
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
 *                 description: The speaker user's email address
 *               otp:
 *                 type: string
 *                 description: The OTP sent to the speaker user's email
 *             required:
 *               - email
 *               - otp
 *     responses:
 *       200:
 *         description: OTP successfully verified, speaker user is now verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "OTP verified successfully, speaker user is now verified"
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
 *         description:Speaker User not found
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

router.post('/profilesetup',authMiddleware,speakerProfileSetupController);

export default router;
