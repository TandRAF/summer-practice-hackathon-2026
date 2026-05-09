import { Request, Response } from 'express';
// 1. Am corectat importul aici: aducem upsertAvailabilityHandler
import { getTodayAvailabilityHandler, upsertAvailabilityHandler } from './availability.handler.js';
import { setAvailabilitySchema } from './availability.schema.js';
import { generateMatchesHandler } from '../groups/groups.handler.js'; 

export const getTodayAvailabilityController = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  try {
    // Generăm data de azi în format YYYY-MM-DD
    const targetDate = new Date().toISOString().split('T')[0];
    const availability = await getTodayAvailabilityHandler(userId, targetDate);
    res.status(200).json(availability || { message: 'No response yet today' });
  } catch (error: any) { 
    res.status(500).json({ error: error.message }); 
  }
};

export const setAvailabilityController = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  try {
    const parsed = setAvailabilitySchema.parse(req.body);
    
    // 2. Am corectat apelul funcției aici: folosim upsertAvailabilityHandler
    const data = await upsertAvailabilityHandler(userId, parsed.target_date, parsed.is_available);
    
    if (parsed.is_available === true) {
       try {
         await generateMatchesHandler(parsed.target_date); 
       } catch (matchErr) {
         console.error("Eroare silențioasă la background matching:", matchErr);
       }
    }

    res.status(200).json({ message: 'Availability updated', availability: data });
  } catch (error: any) { 
    res.status(400).json({ error: error.errors || error.message }); 
  }
};