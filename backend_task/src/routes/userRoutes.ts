import { Router } from 'express';
import { userAuthSignUp, verifyOtp } from '@/controllers/userAuthController';
import { commonLoginController } from './commonLoginController';
import { bookSpeakerController, speakerViewController } from '@/controllers/userViewBookController';
import { authMiddleware } from '@/middlewares/authMiddleware';

const router: Router = Router();

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: User sign-up
 *     description: Creates a new user with the provided details and sends OTP for verification.
 *     tags: 
 *       - Users
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
 *     tags: 
 *       - Users
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

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login for User and Speaker
 *     description: Logs in the user or speaker and generates a JWT token.
 *     tags: 
 *       - Login
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: body
 *         required: true
 *         type: string
 *         description: User's email address.
 *       - name: password
 *         in: body
 *         required: true
 *         type: string
 *         description: User's password.
 *     responses:
 *       200:
 *         description: Successful login and token generation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: 'Login successful, token generated'
 *                 token:
 *                   type: string
 *                   description: JWT token for authorization.
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: User's unique identifier.
 *                     email:
 *                       type: string
 *                       description: User's email.
 *                     userType:
 *                       type: string
 *                       description: Type of user (e.g., 'admin', 'speaker').
 *                     isVerified:
 *                       type: boolean
 *                       description: Whether the user's account is verified.
 *       400:
 *         description: Bad request, either missing parameters or unverified account.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Email and password are required'
 *       404:
 *         description: User or speaker not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'User or speaker not found'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Server error, please try again later.'
 *     security:
 *       - bearerAuth: []
 * definitions:
 *   bearerAuth:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 *     description: 'Authorization header containing the JWT token.'
 */
router.post('/login', commonLoginController);


/**
 * @swagger
 * /users/list-speakers:
 *   get:
 *     summary: List available speakers for a given date
 *     description: Fetches the list of speakers and their available time slots for a given date.
 *     operationId: listSpeakers
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: date
 *         in: query
 *         required: true
 *         description: The date to check availability for, in ISO 8601 format (e.g., 2024-12-10).
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: A list of speakers with available time slots for the specified date.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the speaker.
 *                   fullName:
 *                     type: string
 *                     description: Full name of the speaker.
 *                   availableSlots:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: Available time slots for the speaker in ISO 8601 format.
 *         examples:
 *           application/json:
 *             value: 
 *               - id: 1
 *                 fullName: "John Doe"
 *                 availableSlots:
 *                   - "2024-12-10T09:00:00+05:30"
 *                   - "2024-12-10T10:00:00+05:30"
 *       400:
 *         description: Invalid or missing date parameter.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Date is required"
 *       401:
 *         description: Unauthorized access (Invalid token).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No token provided. Please log in."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

router.get('/list-speakers', authMiddleware, speakerViewController);


/**
 * @swagger
 * /users/book-speaker:
 *   post:
 *     summary: Book a speaker
 *     description: Allows a user to book a time slot with a speaker. Sends email notifications and creates calendar events.
 *     operationId: bookSpeaker
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               speakerId:
 *                 type: integer
 *                 description: The ID of the speaker to book.
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *                 description: The desired booking time in ISO format.
 *             required:
 *               - speakerId
 *               - dateTime
 *     responses:
 *       201:
 *         description: Booking successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the booking.
 *                 speakerId:
 *                   type: integer
 *                   description: The ID of the booked speaker.
 *                 userId:
 *                   type: integer
 *                   description: The ID of the user making the booking.
 *                 dateTime:
 *                   type: string
 *                   format: date-time
 *                   description: The booking time in custom formatted string.
 *                 message:
 *                   type: string
 *                   example: "Booking confirmed. Calendar invites and emails have been sent."
 *       400:
 *         description: Missing or invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Speaker ID and dateTime are required"
 *       403:
 *         description: Unauthorized booking attempt by a speaker.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Speakers are not allowed to book"
 *       404:
 *         description: Speaker or user not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Speaker or user not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post('/book', authMiddleware, bookSpeakerController);

export default router;
