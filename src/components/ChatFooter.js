import React, { useState } from "react";

const ChatFooter =  ({ socket, setMessages }) => {
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleTyping = () => {
    socket.emit("typing", `${user.username} is typing`);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && user) {
      const messageData = {
        text: message,
        name: user.username,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      };
      socket.emit("message", messageData);
      setMessages((prev) => [...prev, messageData]);
      setMessage(""); 
    }
  };

  return (
    <div className="p-2.5 bg-[#F9F5EB] h-[10vh]">
      <form
        className="w-full h-full flex items-center justify-between"
        onSubmit={handleSendMessage}
      >
        <input
          type="text"
          placeholder="Write message"
          className="w-4/5 h-full rounded-lg border border-gray-300 outline-none px-4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="w-[150px] bg-green-600 hover:bg-green-500 p-2.5 text-[#EAE3D2] cursor-pointer">
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
