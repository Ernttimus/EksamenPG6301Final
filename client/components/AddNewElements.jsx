import { Link } from "react-router-dom";
import React from "react";

export function AddNewElements() {
  return (
    <div id="container">
      <div id="nav">
        <h1 className={"h1header"}>Add new Element</h1>

        <p className={"p1"}>
          <Link to="/">Home</Link>
        </p>
        <p className={"p2"}>
          <Link to="/elements">Elements</Link>
        </p>
        <p className={"p3"}>
          <Link to="/elements/new">Add New Element</Link>
        </p>
      </div>

      <div id="content-container">
        <ul>
          <input type="text" id="name" name="name" />
          <input type="text" id="name" name="name" />
        </ul>
      </div>
    </div>
  );
}
