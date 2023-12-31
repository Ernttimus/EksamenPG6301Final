import { Link } from "react-router-dom";
import React from "react";
import { NewUser } from "./newUserScript";

export function Frontpage() {
  return (
    <div id="container">
      <div id="nav">
        <h1 className={"h1header"}>Chat Mania</h1>
        <NewUser />
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
        <h2>This is Chat Mania</h2>
        <h3>Feel free to explore around as you want :)</h3>
      </div>
    </div>
  );
}
