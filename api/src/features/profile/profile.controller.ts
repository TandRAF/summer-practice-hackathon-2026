import { Request, Response } from 'express';
import { getProfileHandler, updateProfileHandler, updateAvatarHandler } from './profile.handler.js';
import { updateProfileSchema, UserProfile } from './profile.schema.js'; // Import the schema

export const getProfileController = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const profile = await getProfileHandler(userId);
    res.status(200).json(profile);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const updateProfileController = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;

  try {
    // 1. Validate the incoming body against the Zod schema
    const parsedData = updateProfileSchema.parse(req.body);

    // 2. Strip out explicitly 'undefined' fields
    // This satisfies TypeScript's exactOptionalPropertyTypes rule
    const validUpdates = Object.fromEntries(
      Object.entries(parsedData).filter(([_, value]) => value !== undefined)
    );
    const updatedProfile = await updateProfileHandler(userId, validUpdates as Partial<UserProfile>);
    
    res.status(200).json({
      message: 'Profile updated successfully',
      profile: updatedProfile
    });
  } catch (error: any) {
    res.status(400).json({ error: error.errors || error.message });
  }
};

export const updateAvatarController = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  
  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const { avatar_url } = req.body;

  if (!avatar_url) {
    return res.status(400).json({ error: 'avatar_url is required' });
  }

  try {
    const updatedProfile = await updateAvatarHandler(userId, avatar_url);
    res.status(200).json({
      message: 'Avatar updated successfully',
      profile: updatedProfile
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};