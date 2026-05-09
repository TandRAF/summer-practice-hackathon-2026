import { Router } from 'express';
import { verifyJWT } from '../../shared/middlewares/auth.middleware.js';
import { asyncHandler } from '../../shared/middlewares/asyncHandler.js';
import { getProfileController, updateProfileController, updateAvatarController } from './profile.controller.js';

export const profileRouter = Router();

profileRouter.get('/', verifyJWT, asyncHandler(getProfileController));
profileRouter.patch('/', verifyJWT, asyncHandler(updateProfileController));
profileRouter.patch('/avatar', verifyJWT, asyncHandler(updateAvatarController));