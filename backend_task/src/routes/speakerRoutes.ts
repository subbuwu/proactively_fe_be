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
 *     tags:
 *       - Speaker
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
 * /speakers/verifyOtp:
 *   post:
 *     summary: Verify OTP
 *     description: Verifies the OTP sent to the speaker user's email to complete the registration process.
 *     tags:
 *       - Speaker
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
 *         description: Speaker User not found
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


/**
 * @swagger
 * /speakers/profilesetup:
 *   post:
 *     summary: Create or update the speaker's profile
 *     description: This endpoint allows a speaker to create or update their profile with expertise and price per session.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Speaker
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               expertise:
 *                 type: string
 *                 description: The area of expertise of the speaker.
 *                 example: "Software Development, Public Speaking"
 *               pricePerSession:
 *                 type: number
 *                 description: The price per session in USD.
 *                 example: 100
 *     responses:
 *       200:
 *         description: Profile setup updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile setup updated successfully"
 *                 updatedSpeaker:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     expertise:
 *                       type: string
 *                     pricePerSession:
 *                       type: number
 *       201:
 *         description: Speaker profile created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Speaker profile created successfully"
 *                 speaker:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     expertise:
 *                       type: string
 *                     pricePerSession:
 *                       type: number
 *       400:
 *         description: Missing required inputs or invalid request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing required inputs: expertise and pricePerSession"
 *       403:
 *         description: Unauthorized access for non-speakers.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "An error occurred while updating/creating the speaker profile. Please try again later."
 */

router.post('/profilesetup',authMiddleware,speakerProfileSetupController);

export default router;
