import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '@/config';  

// Login controller for both User and Speaker
export const commonLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: { speaker: true }  // Include speaker data if available
    });

    if (!user) {
      res.status(404).json({ error: 'User or speaker not found' });
    }

    // Check if the user's account is verified
    if (!user?.isVerified) {
      res.status(400).json({ error: 'Account not verified. Please verify your email first.' });
    }

    // Generate a JWT token for subsequent requests
    const token = jwt.sign(
      { userId: user?.id, email: user?.email, userType: user?.userType },
      process.env.JWT_SECRET || 'env_key', 
      { expiresIn: '3h' }
    );

    // Send the token in the response
    res.status(200).json({
      msg: 'Login successful , token generated',
      token,
      user
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error, please try again later.' });
  }
};
