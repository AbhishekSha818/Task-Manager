import crypto from 'crypto';
import jwt, { SignOptions } from 'jsonwebtoken';

// Simple password hashing with crypto
export const hashPassword = async (password: string): Promise<string> => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const [salt, hash] = hashedPassword.split(':');
  const verify = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return verify === hash;
};

export const generateToken = (userId: string): string => {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRE as any) || '7d',
  };
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', options);
};

export const verifyToken = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { userId: string };
    return decoded.userId;
  } catch {
    return null;
  }
};
