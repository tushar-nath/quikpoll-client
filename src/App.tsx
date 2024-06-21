import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000");

const App: React.FC = () => {
  const [polls, setPolls] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch initial data
    axios
      .get("http://localhost:4000/api/polls")
      .then((response) => setPolls(response.data.polls));
    axios
      .get("http://localhost:4000/api/messages")
      .then((response) => setMessages(response.data.messages));

    // Socket event listeners
    socket.on("voteUpdate", (data) => {
      setPolls((prevPolls) => {
        return prevPolls.map((poll) =>
          poll._id === data.pollId ? { ...poll, options: data.options } : poll
        );
      });
    });

    socket.on("messageResponse", (data) =>
      setMessages((prevMessages) => [data, ...prevMessages])
    );

    socket.on("typingResponse", (data) => {
      // Handle typing indicator
    });

    return () => {
      socket.off("voteUpdate");
      socket.off("messageResponse");
      socket.off("typingResponse");
    };
  }, []);

  const handleVote = (pollId: string, optionIndex: number) => {
    axios
      .post("http://localhost:4000/api/polls/vote", { pollId, optionIndex })
      .then(() => {
        socket.emit("vote", { pollId, optionIndex });
      });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const chatMessage = {
        text: message,
        name: username,
        socketID: socket.id,
      };
      axios.post("http://localhost:4000/api/messages", chatMessage).then(() => {
        socket.emit("message", chatMessage);
        setMessage("");
      });
    }
  };

  return (
    <div>
      <h1>Real-Time Polling and Chat Application</h1>
      <div>
        <h2>Polls</h2>
        {polls.map((poll) => (
          <div key={poll._id}>
            <h3>{poll.question}</h3>
            {poll.options.map((option: any, index: any) => (
              <button key={index} onClick={() => handleVote(poll._id, index)}>
                {option.text} ({option.votes})
              </button>
            ))}
          </div>
        ))}
      </div>
      <div>
        <h2>Chat</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.name}:</strong> {msg.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
