import { useState, useEffect } from 'react'
import { Chatbot } from 'supersimpledev';
import { ChatInput } from './components/ChatInput';
import { ChatMessages } from './components/ChatMessages';
import type { ChatMessage } from './types/chat';
import './App.css'

function loadMessages(): ChatMessage[] {
  try {
    const saved = localStorage.getItem('messages');
    return saved ? (JSON.parse(saved) as ChatMessage[]) : [];
  } catch {
    return [];
  }
}

function App(){
 // we add more responses by using <useEffect>
  useEffect(() => {
    Chatbot.addResponses({
      'goodbye': 'Goodbye. Have a great day!',
      'i love you': 'i love you too',
      'give me a unique id': function() {
        return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
      }
    });

    }, []);

  // state >> to make the component change on html as well
  // the shortest way<< desaructuring >>
  // should be empty [] to make it === 0 
  // 2 const [chatMessages, setChatMessages] = array; //destuvtuting>> shortcut
  // 3  const chatMessages = array[0]; //first value gives us the current data
  // 4 const setChatMessages = array[1]; //second value gives us the function to update the data

  //// we used localStorage to save the chat 
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(loadMessages);
//// we used localStorage to save the chat
  useEffect(() =>{
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  },[chatMessages]);

  const title = `${chatMessages.length} messages`;
    
  return (
    <>
    <title>{title}</title>
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />

    <div className  ="app-container">
      


      {chatMessages.length === 0 && (
        <p className="title">
          Welcome to the chatbot project! Send a message using the textbox below.
          </p>
      )}
      
      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput 
        chatMessages={chatMessages} 
        setChatMessages={setChatMessages}
      />
    </div>
    </>
  );
}

export default App
