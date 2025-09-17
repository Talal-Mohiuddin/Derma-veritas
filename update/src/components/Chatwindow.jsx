"use client";

import { Button } from "@/components/ui/button";
import {
  X,
  Send,
  MessageCircle,
  Bot,
  User,
  Clock,
  CheckCheck,
} from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

// Typing indicator component
const TypingIndicator = () => (
  <div className="flex justify-start items-end space-x-2">
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center shadow-lg">
      <Bot className="w-4 h-4 text-white" />
    </div>
    <div className="bg-gray-100 text-gray-900 max-w-[70%] p-4 rounded-2xl rounded-bl-md shadow-sm">
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
);

// Message timestamp
const MessageTime = ({ timestamp }) => {
  const time = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="flex items-center space-x-1 mt-1 opacity-70">
      <Clock className="w-3 h-3" />
      <span className="text-xs">{time}</span>
    </div>
  );
};

export default function Chatwindow({ isOpen, onClose }) {
  const {
    messages,
    handleSubmit,
    input,
    handleInputChange,
    error,
    reload,
    isLoading: chatIsLoading,
  } = useChat();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, chatIsLoading]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input?.trim() && !chatIsLoading && error == null) {
        handleSubmit(e);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-end p-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md h-[600px] flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 rounded-t-xl flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center shadow-lg">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Derma Veritas Assistant</h3>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-xs text-gray-300">
                  Online • Always here to help
                </p>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200 hover:scale-110"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-6 bg-gradient-to-b from-gray-50/30 to-white">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm text-center">
                👋 Hello! I'm your Derma Veritas Assistant.
                <br />
                How can I help you today?
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end space-x-2 ${
                message.role === "user" ? "justify-end" : "justify-start"
              } animate-in slide-in-from-bottom duration-300`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center shadow-lg flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              <div className="max-w-[70%] space-y-1">
                <div
                  className={`p-4 rounded-2xl shadow-sm ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-br-md"
                      : "bg-gray-100 text-gray-900 rounded-bl-md"
                  }`}
                >
                  <div className="text-sm leading-relaxed">
                    <ReactMarkdown
                      components={{
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            className="text-blue-600 hover:text-blue-800 underline font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>

                <div
                  className={`flex items-center space-x-1 px-2 ${
                    message.role === "user"
                      ? "justify-end text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  <MessageTime timestamp={message.createdAt || new Date()} />
                  {message.role === "user" && (
                    <CheckCheck className="w-3 h-3 text-blue-500" />
                  )}
                </div>
              </div>

              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-lg flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {chatIsLoading && <TypingIndicator />}

          {error && (
            <div className="flex justify-center">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 max-w-[80%] shadow-sm">
                <p className="text-sm text-red-600 mb-3 flex items-center gap-2">
                  <X className="w-4 h-4" />
                  Something went wrong. Please try again.
                </p>
                <Button
                  type="button"
                  onClick={() => reload()}
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50 w-full"
                >
                  Retry
                </Button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100 bg-white rounded-b-xl">
          <form onSubmit={handleSubmit} className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="w-full resize-none border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 shadow-sm transition-all duration-200"
                rows={1}
                style={{
                  minHeight: "44px",
                  maxHeight: "120px",
                }}
                disabled={error != null}
              />
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white p-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
              disabled={!input?.trim() || chatIsLoading || error != null}
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Press Enter to send • Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
