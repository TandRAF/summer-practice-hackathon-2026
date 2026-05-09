// types/chat.ts
export interface ChatMessageModel {
  id: string;
  thread_id: string;
  sender_id: string;
  content: string;
  sent_at: string;
  profiles: {
    username: string;
    full_name: string;
    avatar_url: string | null;
  };
}