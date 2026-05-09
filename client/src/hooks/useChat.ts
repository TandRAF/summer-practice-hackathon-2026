import { useState, useEffect, useCallback } from 'react';
import type { ChatMessageModel } from '../types/chat';
import { chatService } from '../services/chatService';

export const useChat = (groupId: string | undefined) => {
  const [messages, setMessages] = useState<ChatMessageModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadMessages = useCallback(async () => {
    if (!groupId) return;
    setLoading(true);
    try {
      const data = await chatService.getMessages(groupId);
      setMessages(data);
    } catch (err: any) {
      setError('Failed to load chat');
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  const sendMessage = async (content: string) => {
    if (!groupId) return;
    try {
      await chatService.sendMessage(groupId, content);
      await loadMessages(); // La un hackathon, un simplu re-fetch după send este suficient (fără WebSockets)
    } catch (err: any) {
      setError('Message failed to send');
    }
  };

  useEffect(() => {
    loadMessages();
    // Hackathon trick: Polling la fiecare 5 secunde pentru a simula "real-time" fără bătaie de cap cu socket.io
    const interval = setInterval(loadMessages, 5000); 
    return () => clearInterval(interval);
  }, [loadMessages]);

  return { messages, loading, error, sendMessage };
};