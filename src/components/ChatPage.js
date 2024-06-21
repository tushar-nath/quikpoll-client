import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import axios from "axios";

const ChatPage = ({ socket }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    } else {
      const userData = JSON.parse(user);
      socket.emit("newUser", { username: userData.username });
      fetchMessages();
    }

    return () => {
      socket.off("newUser");
    };
  }, [navigate, socket]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_NODE_SERVER_BASE_URL}/api/messages`
      );
      setMessages(response.data.messages.reverse());
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setMessages((prev) => {
        if (!prev.some((msg) => msg.id === data.id)) {
          return [...prev, data];
        }
        return prev;
      });
    });
  }, [socket]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-screen flex items-center">
      <ChatBar socket={socket} />
      <div className="h-full flex-[0.8]">
        <ChatBody
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter socket={socket} setMessages={setMessages} />
      </div>
    </div>
  );
};

export default ChatPage;
