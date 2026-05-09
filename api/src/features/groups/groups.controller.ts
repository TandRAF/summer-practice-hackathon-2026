import { Request, Response } from 'express';
import { getMyGroupsHandler, updateMemberStatusHandler, generateMatchesHandler, getGroupWithMembersHandler } from './groups.handler.js';
import { updateMemberStatusSchema } from './groups.schema.js';

export const getMyGroupsController = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  try {
    const groups = await getMyGroupsHandler(userId);
    res.status(200).json(groups);
  } catch (error: any) { 
    res.status(500).json({ error: error.message }); 
  }
};

export const updateMemberStatusController = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  
  const memberId = req.params.memberId as string;
  
  if (!memberId) {
    return res.status(400).json({ error: "memberId is required in URL path" });
  }

  try {
    const parsedData = updateMemberStatusSchema.parse(req.body);
    const updated = await updateMemberStatusHandler(memberId, userId, parsedData.status);
    res.status(200).json(updated);
  } catch (error: any) { 
    res.status(400).json({ error: error.errors || error.message }); 
  }
};

export const triggerMatchingController = async (req: Request, res: Response) => {
  const todayDate = new Date().toISOString().split('T')[0]!;
  
  try {
    const result = await generateMatchesHandler(todayDate);
    res.status(200).json(result);
  } catch (error: any) { 
    res.status(500).json({ error: error.message }); 
  }
};
export const getGroupDetailsController = async (req: Request, res: Response) => {
  // Extragem groupId din parametri
  const { groupId } = req.params;

  // REZOLVARE TS: Verificăm dacă groupId este string și nu este undefined
  if (!groupId || typeof groupId !== 'string') {
    return res.status(400).json({ error: 'A valid groupId is required in the URL path' });
  }

  try {
    // Acum TypeScript știe 100% că groupId este string
    const group = await getGroupWithMembersHandler(groupId);
    res.status(200).json(group);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
import { getChatMessagesHandler, sendChatMessageHandler } from './groups.handler.js';

export const getChatMessagesController = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  try {
    const messages = await getChatMessagesHandler(groupId!);
    res.status(200).json(messages);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const sendChatMessageController = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const { groupId } = req.params;
  const { content } = req.body;

  if (!content) return res.status(400).json({ error: 'content is required' });

  try {
    const message = await sendChatMessageHandler(groupId!, userId, content);
    res.status(201).json(message);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};