import { Link } from "react-router-dom";
import React from "react";

export function Frontpage() {
  return (
    <div id="container">
      <div id="nav">
        <h1 className={"h1header"}>Element Database</h1>

        <div>
          <Link to="/">Home</Link>
        </div>

        <div>
          <Link to="/elements">Elements</Link>
        </div>

        <div>
          <Link to="/elements/new">Add New Element</Link>
        </div>

        <div>
          <Link to="/login">Login</Link>
        </div>

        <div>
          <Link to="/profile">Profile</Link>
        </div>
      </div>
      <div id="content-container"></div>
    </div>
  );
}
