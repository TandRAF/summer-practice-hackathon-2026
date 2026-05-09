import { Router } from 'express';
import { verifyJWT } from '../../shared/middlewares/auth.middleware.js';
import { asyncHandler } from '../../shared/middlewares/asyncHandler.js';
import { getMyGroupsController, updateMemberStatusController, triggerMatchingController, getGroupDetailsController } from './groups.controller.js';

export const groupsRouter = Router();

groupsRouter.get('/my', verifyJWT, asyncHandler(getMyGroupsController));
groupsRouter.patch('/members/:memberId/status', verifyJWT, asyncHandler(updateMemberStatusController));
groupsRouter.post('/trigger-match', verifyJWT, asyncHandler(triggerMatchingController)); // Admin/Cron trigger
groupsRouter.get('/:groupId', verifyJWT, getGroupDetailsController);

import { getChatMessagesController, sendChatMessageController } from './groups.controller.js';

groupsRouter.get('/:groupId/messages', verifyJWT, asyncHandler(getChatMessagesController));
groupsRouter.post('/:groupId/messages', verifyJWT, asyncHandler(sendChatMessageController));