import { prisma } from "@/config";
import { Request, Response } from "express";

export const speakerProfileSetupController = async (req: Request, res: Response) => {
    // Ensure that the user is a speaker
    // @ts-ignore
    if (req.user.userType !== 'SPEAKER') {
         res.status(403).json({
            message: 'Unauthorized access , only speakers can create/update'
        });
        return;
    }

    const { expertise, pricePerSession } = req.body;

    // Validate inputs
    if (!expertise || !pricePerSession) {
         res.status(400).json({
            message: "Missing required inputs: expertise and pricePerSession"
        });
        return;
    }

    try {
        // Check if the speaker profile exists
        let speaker = await prisma.speaker.findUnique({
            where: {
                // @ts-ignore
                userId: req.user.userId, 
            }
        });

        // If speaker doesn't exist, create a new one
        if (!speaker) {
            speaker = await prisma.speaker.create({
                data: {
                    expertise,
                    pricePerSession,
                    // @ts-ignore
                    userId: req.user.userId ,
                }
            });
            res.status(201).json({
                message: "Speaker profile created successfully",
                speaker
            });
            return;
        }

        // If speaker exists, update the profile
        const updatedSpeaker = await prisma.speaker.update({
            where: {
                // @ts-ignore
                userId: req.user.userId, 
            },
            data: {
                expertise,
                pricePerSession
            }
        });

        res.status(200).json({
            message: "Profile setup updated successfully",
            updatedSpeaker
        });
        return;
    } catch (error) {
        console.error("Error updating/creating speaker profile:", error);
        res.status(500).json({
            errorMessage: "An error occurred while updating/creating the speaker profile. Please try again later."
        });
        return;
    }
};
