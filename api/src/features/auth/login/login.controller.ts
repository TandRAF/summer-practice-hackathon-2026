import { type Request, type Response } from 'express';
import { loginHandler } from './login.handler.js';

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginHandler(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};