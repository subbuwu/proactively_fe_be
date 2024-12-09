import crypto from 'crypto';

export const generateOTP = (): string => {
    return crypto.randomBytes(3).toString('hex'); 
};