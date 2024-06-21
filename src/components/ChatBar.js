import React, { useState, useEffect } from "react";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleNewUserResponse = (data) => {
      setUsers(data);
    };

    socket.on("newUserResponse", handleNewUserResponse);

    return () => {
      socket.off("newUserResponse", handleNewUserResponse);
    };
  }, [socket]);

  return (
    <div className="h-full bg-[#F9F5EB] flex-[0.2] p-5 border-r border-[#fdfdfd]">
      <h2 className="text-xl font-bold mb-5">Open Chat</h2>
      <div>
        <h4 className="text-lg font-semibold mb-3">ACTIVE USERS</h4>
        <div className="space-y-2">
          {users.map((user) => (
            <p key={user.socketID} className="text-[#607EAA] text-sm">
              {user.username}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
