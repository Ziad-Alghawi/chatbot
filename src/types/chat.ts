export type Sender = 'user' | 'robot';

export type ChatMessage = {
  id: string;
  message: string;
  sender: Sender;
  time: number;
  isLoading?: boolean;
};
