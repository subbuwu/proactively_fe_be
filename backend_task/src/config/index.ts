import { PrismaClient } from '@prisma/client'
import nodemailer from "nodemailer";

export const prisma = new PrismaClient()

export const transporter = nodemailer.createTransport({
    service: "gmail",  // You can use other services too like Outlook, Yahoo, etc.
    auth: {
        user: process.env.EMAIL,  // Your email address
        pass: process.env.EMAIL_PASSWORD,  // Your email password (or app password if using Gmail with 2FA)
    },
});
