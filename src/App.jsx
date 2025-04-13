import React from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { ChatMessage } from "./components/ChatMessage";
import { ChatInput } from "./components/ChatInput";
import { MessageSquare } from "lucide-react";

function App() {
  const [messages, setMessages] = useLocalStorage("chat-messages", []);

  const handleSendMessage = (content, imageUrl = null) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: Date.now(),
      imageUrl,
    };

    setMessages([...messages, newMessage]);

    setTimeout(() => {
      const response = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your message! This is a simulated response.",
        sender: "other",
        timestamp: Date.now() + 1000,
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-white border-b px-4 py-4 flex items-center gap-2">
          <MessageSquare className="text-blue-500" size={24} />
          <h1 className="text-xl font-semibold text-gray-800">Chat App</h1>
        </div>

        <div className="h-[500px] overflow-y-auto p-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <MessageSquare size={48} className="mb-2 opacity-50" />
              <p className="text-center">
                No messages yet. Start a conversation!
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
        </div>

        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;
