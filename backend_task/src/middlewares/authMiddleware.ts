import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware to check JWT token
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1] ?? ''; // Bearer <token>

  if (!token) {
    res.status(401).json({ error: 'No token provided. Please log in.' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'env_key') as jwt.JwtPayload;

    // Attach user data to request object
    // @ts-ignore
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};
