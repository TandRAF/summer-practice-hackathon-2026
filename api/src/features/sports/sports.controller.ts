import { Request, Response } from 'express';
import { getAllSportsHandler, getUserPreferencesHandler, upsertPreferenceHandler } from './sports.handler.js';
import { setPreferenceSchema } from './sports.schema.js';

export const getAllSportsController = async (req: Request, res: Response) => {
  try {
    const sports = await getAllSportsHandler();
    res.status(200).json(sports);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPreferencesController = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  if (!userId) return res.status(401).json({ error: 'User not authenticated' });

  try {
    const prefs = await getUserPreferencesHandler(userId);
    res.status(200).json(prefs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePreferenceController = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  if (!userId) return res.status(401).json({ error: 'User not authenticated' });

  try {
    const parsedData = setPreferenceSchema.parse(req.body);
    const updatedPref = await upsertPreferenceHandler(userId, parsedData.sport_id, parsedData.skill_level);
    
    res.status(200).json({
      message: 'Preference saved successfully',
      preference: updatedPref
    });
  } catch (error: any) {
    res.status(400).json({ error: error.errors || error.message });
  }
};