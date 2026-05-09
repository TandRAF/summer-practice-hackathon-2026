import { Request, Response } from 'express';
import { RegisterSchema } from './register.schema.js';
import { registerHandler } from './register.handler.js';

export const registerController = async (req: Request, res: Response) => {

  const validatedData = RegisterSchema.parse(req.body);

  const result = await registerHandler(
    validatedData.email, 
    validatedData.password, 
    validatedData.username
  );

  res.status(201).json(result);
};