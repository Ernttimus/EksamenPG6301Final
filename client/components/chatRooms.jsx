import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useLoading, useLoading2 } from "../useLoading";
import { fetchJSON } from "../fetchJSON";

function ElementCard({ elements: { _id, title } }) {
  return (
    <>
      <h3>{title}</h3>
      <div>{_id}</div>
    </>
  );
}

export function ChatRooms() {
  const { loading, error, data } = useLoading(
    async () => await fetchJSON("/api/elements"),
  );

  const { loading2, error2, data2 } = useLoading2(
    async () => await fetchJSON("/api/login"),
  );

  const [newTitle, setNewTitle] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleCreateChatRoom = async () => {
    if (!newTitle || !newEmail) {
      alert("Please enter both title and email");
      return;
    }

    try {
      await fetch("/api/createUser/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: data2.name,
          emailUser: data2.email,
          title: newTitle,
          newEmail: newEmail,
        }),
      });
      window.location.reload();
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error.toString()}</div>
      </div>
    );
  }

  return (
    <div id="container">
      <div id="nav">
        <h1 className={"h1header"}>Chat Mania</h1>

        <div>
          <Link to="/">Home</Link>
        </div>

        <div>
          <Link to="/chatroom">Chat Room</Link>
        </div>

        <div>
          <Link to="/login">Login</Link>
        </div>

        <div>
          <Link to="/profile">Profile</Link>
        </div>
      </div>
      <div id="content-container">
        <div>
          <h2>Create New Chat Room</h2>
          <label>Title:</label>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <label>Email:</label>
          <input
            type="text"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button onClick={handleCreateChatRoom}>Create</button>
        </div>
        <ul>
          {data.map((elements) => (
            <li className={"users"} key={elements._id}>
              <ElementCard elements={elements} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
