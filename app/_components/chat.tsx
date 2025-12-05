"use client";
import { useState } from "react";
import { ChatMessega } from "../icons/messsega";
import { Send } from "../icons/send";
import { Ex } from "../icons/ex";
export const Chat = () => {
  const [message, setMessage] = useState(false);
  const handleChatMessega = () => {
    setMessage(!message);
  };
  return (
    <div className="ml-100 mt-200">
      {message && (
        <div className="fixed bottom-6 right-6 w-[380px] h-[472px] bg-white shadow-xl border border-gray-200 rounded-xl flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <p className="font-medium text-gray-800">Chat assistant</p>
            <button
              className="text-gray-500 hover:text-gray-700 cursor-pointer w-8 h-8 rounded-lg border flex justify-center items-center"
              onClick={() => {
                setMessage(false);
              }}
            >
              <Ex />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-white">
            <div className="w-fit max-w-[80%] bg-black text-white px-4 py-2 rounded-lg text-sm">
              How can I help you today?
            </div>
          </div>

          <div className="p-3 border-t flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 cursor-pointer">
              <Send />
            </button>
          </div>
        </div>
      )}

      <button
        className="w-12 h-12 bg-black rounded-full flex items-center justify-center cursor-pointer"
        onClick={handleChatMessega}
      >
        <ChatMessega />
      </button>
    </div>
  );
};
