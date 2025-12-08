"use client";
import { useState } from "react";
import { ChatMessega } from "../icons/messsega";
import { Send } from "../icons/send";
import { Ex } from "../icons/ex";
interface Message {
  role: "user" | "assistant";
  content: string;
}
export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  const handleChatMessega = () => {
    setMessage(!message);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat: userMessage }),
      });
      const data = await response.json();
      if (data.err) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Error: ${data.err}` },
        ]);
      } else if (data.text) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.text },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${err}` },
      ]);
    } finally {
      setLoading(false);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
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

          <div className="flex-1 p-4 overflow-y-auto bg-white mb-4 space-y-4">
            <div className="w-fit max-w-[80%] bg-gray-200 px-4 py-2 rounded-lg text-sm">
              How can I help you today?
            </div>
            {/* {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                Start a conversation by typing a message below
              </div>
            )} */}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-3 border-t flex items-center gap-2">
            <input
              type="text"
              disabled={loading}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 cursor-pointer"
            >
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
