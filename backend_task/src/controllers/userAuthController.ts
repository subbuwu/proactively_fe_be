import { Request, Response } from "express";
import { Resend } from "resend";
import prismaDB from "../config";
import { generateOTP } from "../utils/otpGenerator";

const resend = new Resend(process.env.RESEND_API_KEY);

export const userAuthSignUp = async (req: Request, res: Response): Promise<Response> => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            errorMsg: "Missing required inputs",
        });
    }

    try {
        // Check if the user already exists
        const existingUser = await prismaDB.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return res.status(400).json({
                msg: "User already exists",
            });
        }

        // Create the new user
        const user = await prismaDB.user.create({
            data: {
                email,
                lastName,
                firstName,
                password,
                isVerified: false,
                userType: 'USER',
            },
        });

        // Generate OTP
        const otp = generateOTP();

        try {
            // Send OTP email using Resend
            await resend.emails.send({
                from: "nsubbu2004@gmail.com",
                to: email,
                subject: "Proactively | OTP for User Verification",
                text: `Your OTP is: ${otp}`,
            });

            // After sending OTP, respond with a success message
            return res.status(201).json({
                msg: "User created successfully. Please verify your email.",
            });
        } catch (error: any) {
            // Handle email send error
            console.error("Error sending OTP email:", error);
            return res.status(500).json({
                message: 'Error sending OTP, please try again later.',
            });
        }
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({
            errorMsg: "Server error, please try again later.",
        });
    }
};
