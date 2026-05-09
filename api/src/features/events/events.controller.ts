import { Request, Response } from 'express';
import { getVenuesHandler, createEventHandler } from './events.handler.js';
import { createEventSchema } from './events.schema.js';

export const getVenuesController = async (req: Request, res: Response) => {
  try {
    const venues = await getVenuesHandler();
    res.status(200).json(venues);
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const createEventController = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  try {
    const parsedData = createEventSchema.parse(req.body);
    const newEvent = await createEventHandler(userId, parsedData);
    res.status(201).json({ message: 'Event created!', event: newEvent });
  } catch (error: any) { res.status(400).json({ error: error.errors || error.message }); }
};