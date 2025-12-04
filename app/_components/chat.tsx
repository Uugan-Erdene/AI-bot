"use client";
import { useState } from "react";
import { ChatMessega } from "../icons/messsega";
export const Chat = () => {
  const [message, setMessage] = useState(false);
  const handleChatMessega = () => {
    setMessage(!message);
  };
  return (
    <div className="ml-100 mt-200">
      {message && <div className="bg-black w-40 h-40 absolute"></div>}

      <button
        className="w-12 h-12 bg-black rounded-full flex items-center justify-center cursor-pointer"
        onClick={handleChatMessega}
      >
        <ChatMessega />
      </button>
    </div>
  );
};
