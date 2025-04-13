import React from "react";

export function ChatMessage({ message }) {
  const isUser = message.sender === "user";
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {message.imageUrl && (
          <div className="mb-2">
            <img
              src={message.imageUrl}
              alt="Sent image"
              className="rounded max-w-full h-auto"
            />
          </div>
        )}
        {message.content && (
          <p className="text-sm md:text-base">{message.content}</p>
        )}
        <p
          className={`text-xs mt-1 ${
            isUser ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {timestamp}
        </p>
      </div>
    </div>
  );
}
