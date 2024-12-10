import { Request, Response } from "express";
import { generateOTP } from "@/utils/otpGenerator";  
import { prisma, transporter } from "@/config";
import { addMinutes } from 'date-fns';  

export const speakerAuthSignUp = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        res.status(400).json({
            errorMsg: "Missing required inputs",
        });
    }

    try {
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            res.status(400).json({
                msg: "Speaker already exists",
            });
        }

        // Generate OTP
        const otp = generateOTP();
        const otpExpiry = addMinutes(new Date(), 10); 

        const user = await prisma.user.create({
            data: {
                email,
                lastName,
                firstName,
                password,
                isVerified: false,
                userType: 'SPEAKER',
                otp,
                otpExpiry,
            },
        });

        const mailOptions = {
            from: `"Subramanian | Proactively" <${process.env.EMAIL}>`,
            to: email,
            subject: "Speaker OTP for User Verification",
            html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
        };

        try {
            const info = await transporter.sendMail(mailOptions);

            res.status(201).json({
                msg: "Speaker User created successfully. Please verify your email.",
                info,
            });
        } catch (error: any) {
            // Handle error sending OTP
            console.error("Error sending OTP email:", error);
            res.status(500).json({
                message: 'Error sending OTP, please try again later.',
            });
        }
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({
            errorMsg: "Server error, please try again later.",
        });
    }
};



export const verifyOtp = async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
         res.status(400).json({ errorMsg: "Email and OTP are required" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
             res.status(404).json({ errorMsg: "User not found" });
        }

        if (user?.otpExpiry && new Date(user.otpExpiry) < new Date()) {
             res.status(400).json({ errorMsg: "OTP has expired" });
        }

        if (user?.otp !== otp) {
             res.status(400).json({ errorMsg: "Invalid OTP" });
        }

        // Mark the user as verified and clear OTP data
        await prisma.user.update({
            where: { email },
            data: {
                isVerified: true,
                otp: null,
                otpExpiry: null,
            },
        });

         res.status(200).json({ msg: "OTP verified successfully, user is now verified" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
         res.status(500).json({ errorMsg: "Server error, please try again later." });
    }
};
