import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModels';

const JWT_SECRECT = process.env.JWT_SECRET || 'segredo_de_estado';
const JWT_EXPIRES = '7d';
export const generateToken = (user: UserModel): string => {
  return jwt.sign({ user }, JWT_SECRECT, { expiresIn: JWT_EXPIRES });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRECT);
};
