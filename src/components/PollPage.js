import React, { useState, useEffect } from "react";
import axios from "axios";

const PollsPage = ({ socket }) => {
  const [polls, setPolls] = useState([]);
  const [newPoll, setNewPoll] = useState({ question: "", options: ["", ""] });

  useEffect(() => {
    fetchPolls();

    socket.on("pollUpdate", (updatedPoll) => {
      setPolls((prevPolls) =>
        prevPolls.map((poll) =>
          poll._id === updatedPoll._id ? updatedPoll : poll
        )
      );
    });

    return () => {
      socket.off("pollUpdate");
    };
  }, [socket]);

  const fetchPolls = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/polls");
      setPolls(response.data.polls);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };

  const handleCreatePoll = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post("http://localhost:4000/api/polls", {
        ...newPoll,
        userId: user._id,
      });
      setPolls([...polls, response.data.poll]);
      setNewPoll({ question: "", options: ["", ""] });
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  };

  const handleVote = async (pollId, optionIndex) => {
    try {
      // Remove the local update
      // Only emit the vote event to the server
      socket.emit("vote", { pollId, optionIndex });
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Polls</h1>

      <form onSubmit={handleCreatePoll} className="mb-8">
        <input
          type="text"
          value={newPoll.question}
          onChange={(e) => setNewPoll({ ...newPoll, question: e.target.value })}
          placeholder="Poll question"
          className="w-full p-2 mb-2 border rounded"
        />
        {newPoll.options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => {
              const newOptions = [...newPoll.options];
              newOptions[index] = e.target.value;
              setNewPoll({ ...newPoll, options: newOptions });
            }}
            placeholder={`Option ${index + 1}`}
            className="w-full p-2 mb-2 border rounded"
          />
        ))}
        <button
          type="button"
          onClick={() =>
            setNewPoll({ ...newPoll, options: [...newPoll.options, ""] })
          }
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Add Option
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Poll
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {polls.map((poll) => (
          <div key={poll._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{poll.question}</h2>
            {poll.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleVote(poll._id, index)}
                className="w-full p-2 mb-2 bg-gray-100 hover:bg-gray-200 rounded"
              >
                {option.text} ({option.votes})
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollsPage;
