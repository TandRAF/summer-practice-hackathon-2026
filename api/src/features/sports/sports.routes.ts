import { Router } from 'express';
import { verifyJWT } from '../../shared/middlewares/auth.middleware.js';
import { asyncHandler } from '../../shared/middlewares/asyncHandler.js';
import { getAllSportsController, getPreferencesController, updatePreferenceController } from './sports.controller.js';

export const sportsRouter = Router();

sportsRouter.get('/', verifyJWT, asyncHandler(getAllSportsController));
sportsRouter.get('/preferences', verifyJWT, asyncHandler(getPreferencesController));
sportsRouter.post('/preferences', verifyJWT, asyncHandler(updatePreferenceController));