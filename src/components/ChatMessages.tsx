import { ChatMessage } from './ChatMessage';
import useAutoScroll from '../hooks/useAutoScroll';
import './ChatMessages.css'
import type { ChatMessage as ChatMessageType } from '../types/chat';

type ChatMessagesProps = {
  chatMessages: ChatMessageType[];
};

export function ChatMessages({chatMessages}: ChatMessagesProps) { //4th
  const chatMessagesRef = useAutoScroll([chatMessages]);
  // hooks always in the top of the component 
    //scroll automatically to the bottom we used>> hooks useEffect and useRef to get element from html

  return(
    <div className="chat-messages-container"
      ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return(
          <ChatMessage 
            message={chatMessage.message} 
            sender={chatMessage.sender}
            time={chatMessage.time}
            isLoading={chatMessage.isLoading}
            key={chatMessage.id}
          />
        )
      })}
    </div>
  );
}