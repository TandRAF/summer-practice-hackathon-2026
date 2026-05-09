import {api} from './api'; 
import type { ChatMessageModel } from '../types/chat';

export const chatService = {
  getMessages: async (groupId: string): Promise<ChatMessageModel[]> => {
    const response = await api.get(`/groups/${groupId}/messages`);
    return response.data;
  },

  sendMessage: async (groupId: string, content: string) => {
    const response = await api.post(`/groups/${groupId}/messages`, { content });
    return response.data;
  }
};