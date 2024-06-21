import React from "react";
import { useNavigate } from "react-router-dom";

const ChatBody = ({ messages, typingStatus, lastMessageRef }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLeaveChat = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header className="w-full h-[10vh] flex items-center justify-between p-5 bg-[#F9F5EB]">
        <p>Hangout with Colleagues</p>
        <button
          className="px-4 py-2 w-[150px] bg-[#D1512D] text-[#EAE3D2] cursor-pointer"
          onClick={handleLeaveChat}
        >
          LEAVE CHAT
        </button>
      </header>

      <div className="w-full h-[80vh] bg-white p-5 overflow-y-scroll space-y-3">
        {messages.map((message) =>
          message.name === user.username ? (
            <div key={message.id} className="space-y-1">
              <p className="text-right text-sm">You</p>
              <div className="bg-[#c2f3c2] max-w-[300px] p-2.5 rounded-lg ml-auto text-sm">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div key={message.id} className="space-y-1">
              <p className="text-sm">{message.name}</p>
              <div className="bg-[#f5ccc2] w-[300px] p-2.5 rounded-lg text-sm">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="fixed bottom-[50px] text-sm italic">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
