import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ListElements } from "./components/ListElements";
import { AddNewElements } from "./components/AddNewElements";

import { Callback } from "./components/Callback";
import { Login } from "./components/Login";
import { Profile } from "./components/Profile";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Frontpage() {
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

function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/elements"} element={<ListElements />} />
        <Route path={"/elements/new"} element={<AddNewElements />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/login/callback"} element={<Callback />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/"} element={<Frontpage />} />
      </Routes>
    </BrowserRouter>
  );
}
root.render(<Application />);
