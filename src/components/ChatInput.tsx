import { useState } from 'react'
import dayjs from 'dayjs';
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';
import type { ChatMessage } from '../types/chat';

type ChatInputProps = {
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
};

export function ChatInput({chatMessages, setChatMessages}: ChatInputProps) { //2nd
  const [inputText, setInputText] = useState('');

// Tracks if chatbot is currently waiting for a response
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event: React.ChangeEvent<HTMLInputElement>){
    setInputText(event.target.value);

  }
// we added async to make wait for the response >EX 03k
  async function sendMessage() {
    const trimmedInput = inputText.trim();
// Stop if bot is busy OR input is empty
    if (isLoading || trimmedInput === '') {
      return;
    }
// Lock sending while waiting for chatbot reply
    setIsLoading(true);

    const newChatMessages: ChatMessage[] = [
      ...chatMessages,
      {
        message: trimmedInput,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      },
      {
        message: '',
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
        isLoading: true
      }
    ];

    setChatMessages(newChatMessages);

    setInputText('');

    try {
      const response = await Chatbot.getResponseAsync(trimmedInput);
      setChatMessages([
        ...newChatMessages.slice(0, newChatMessages.length -1), // to remove the loading message
        {
          message: response,
          sender: 'robot',
          id: crypto.randomUUID(),
          time: dayjs().valueOf()
        }
      ]);
    } catch {
      setChatMessages([
        ...newChatMessages.slice(0, newChatMessages.length -1),
        {
          message: 'Sorry, something went wrong. Please try again.',
          sender: 'robot',
          id: crypto.randomUUID(),
          time: dayjs().valueOf()
        }
      ]);
    } finally {
      // Unlock sending after response arrives
      setIsLoading(false);
    }
    
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      sendMessage();
    }else if (event.key === 'Escape'){
      setInputText('');
    }
  }

  function clearMessages() {
    setChatMessages([]);
    // Here, you could also run:
    // localStorage.setItem('messages', JSON.stringify([])); However, because chatMessages is being updated, the useEffect in the App component will run, and it willautomatically update messages in localStorage to be [].

    
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to Chatbot" 
        size={30} 
        onChange={saveInputText}
        value={inputText}//controlled input >> to make the input value change on html
        onKeyDown= {handleKeyDown}
        className="chat-input"
      />
      <button onClick={sendMessage}
        className="send-button" >Send</button>

        <button onClick={clearMessages}
        className="clear-button" >Clear</button>
    </div>
  )
}