import { Router } from 'express';
import { verifyJWT } from '../../shared/middlewares/auth.middleware.js';
import { asyncHandler } from '../../shared/middlewares/asyncHandler.js';
import { getTodayAvailabilityController, setAvailabilityController } from './availability.controller.js';

export const availabilityRouter = Router();

availabilityRouter.get('/today', verifyJWT, asyncHandler(getTodayAvailabilityController));
availabilityRouter.post('/', verifyJWT, asyncHandler(setAvailabilityController));