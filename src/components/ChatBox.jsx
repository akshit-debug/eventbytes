import React, { useState, useEffect, useRef } from 'react';

const usernames = ["Akshit", "Rahul", "Priya", "Dev", "Sneha", "Aman", "Neha"];
const colors = ["text-blue-400", "text-green-400", "text-pink-400", "text-yellow-400", "text-purple-400"];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const getTime = () => {
  return new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typingUser, setTypingUser] = useState(null);
  const chatEndRef = useRef(null);
  const containerRef = useRef(null);

  // Initial messages
  useEffect(() => {
    setMessages([
      { id: 1, text: "👋 Welcome to EventBytes!", type: "system", time: getTime() },
      { id: 2, text: "Stream starting soon 🚀", type: "mod", user: "Moderator", time: getTime(), color: "text-yellow-400" },
    ]);
  }, []);

  // ✅ SMART AUTO SCROLL (no page jump)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTop = container.scrollHeight;
  }, [messages, typingUser]);

  // Fake chat
  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser = usernames[Math.floor(Math.random() * usernames.length)];
      const randomText = [
        "🔥 This is amazing!",
        "Anyone from Delhi?",
        "Great speaker 👏",
        "Loving this session!",
        "Can someone share notes?",
      ][Math.floor(Math.random() * 5)];

      setTypingUser(randomUser);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: randomText,
            type: "user",
            user: randomUser,
            time: getTime(),
            color: getRandomColor(),
          },
        ]);
        setTypingUser(null);
      }, 1500);

    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Send
  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: input,
        type: "me",
        user: "You",
        time: getTime(),
        color: "text-blue-400",
      },
    ]);

    setInput('');
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* HEADER */}
      <div className="p-4 border-b border-white/10 font-semibold backdrop-blur-md bg-white/5 flex-shrink-0">
        💬 Live Chat
      </div>

      {/* MESSAGES (FIXED 🔥) */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 text-sm"
      >

        {messages.map((msg) => (
          <div key={msg.id} className="animate-[fadeIn_0.25s_ease]">

            {/* SYSTEM */}
            {msg.type === "system" && (
              <div className="text-center text-gray-400 text-xs">
                {msg.text}
              </div>
            )}

            {/* USER */}
            {msg.type !== "system" && (
              <div
                className={`max-w-[80%] px-3 py-2 rounded-xl transition-all
                ${msg.type === 'me'
                    ? 'ml-auto bg-blue-600 text-white shadow-md'
                    : msg.type === 'mod'
                      ? 'bg-yellow-500/20 border border-yellow-500/30'
                      : 'bg-white/10 hover:bg-white/15'
                  }`}
              >

                {/* USER + TIME */}
                <div className="flex justify-between text-[11px] mb-1 opacity-70">
                  <span className={`font-semibold ${msg.color}`}>
                    {msg.user}
                  </span>
                  <span>{msg.time}</span>
                </div>

                {/* TEXT */}
                <div className="leading-relaxed">{msg.text}</div>
              </div>
            )}

          </div>
        ))}

        {/* ✨ Typing */}
        {typingUser && (
          <div className="flex items-center gap-2 text-gray-400 text-xs italic">
            <span>{typingUser}</span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        )}

      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-white/10 flex gap-2 backdrop-blur-md bg-white/5 flex-shrink-0">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 
          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          transition"
        />

        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white 
          transition hover:scale-105 active:scale-95"
        >
          Send
        </button>

      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

    </div>
  );
};

export default ChatBox;