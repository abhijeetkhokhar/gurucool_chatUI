import React, { useState, useRef } from "react";
import { Send, Image as ImageIcon, X } from "lucide-react";

export function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (message.trim() || imagePreview) {
      onSendMessage(message.trim(), imagePreview);
      setMessage("");
      setImagePreview(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    fileInputRef.current.value = "";
  };

  return (
    <div className="border-t bg-white">
      {imagePreview && (
        <div className="p-2 border-b">
          <div className="relative inline-block">
            <img src={imagePreview} alt="Preview" className="h-20 rounded" />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
      <div className="flex items-end gap-2 p-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          ref={fileInputRef}
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
        >
          <ImageIcon size={20} />
        </button>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 resize-none rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] max-h-[120px]"
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={!message.trim() && !imagePreview}
          className="rounded-full p-2 bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
