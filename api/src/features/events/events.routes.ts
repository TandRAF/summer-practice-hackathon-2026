import { Router } from 'express';
import { verifyJWT } from '../../shared/middlewares/auth.middleware.js';
import { asyncHandler } from '../../shared/middlewares/asyncHandler.js';
import { getVenuesController, createEventController } from './events.controller.js';

export const eventsRouter = Router();

eventsRouter.get('/venues', verifyJWT, asyncHandler(getVenuesController));
eventsRouter.post('/', verifyJWT, asyncHandler(createEventController));