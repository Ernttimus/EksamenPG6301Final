import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ListElements } from "./components/ListElements";
import { AddNewElements } from "./components/AddNewElements";
import { Login } from "./components/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));

export function useLoading(loadingFunction) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  async function load() {
    try {
      setLoading(true);
      setData(await loadingFunction());
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);
  return { loading, error, data };
}
export async function fetchJSON(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to load ${res.status}: ${res.statusText}`);
  }

  return await res.json();
}

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
          <Link to="/profile">profile</Link>
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
        <Route path={"/"} element={<Frontpage />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/login/callback"} element={<h1>callback </h1>} />
        <Route path={"/profile"} element={<h1>profile </h1>} />

        <Route path={"/elements"} element={<ListElements />} />
        <Route path={"/elements/new"} element={<AddNewElements />} />
      </Routes>
    </BrowserRouter>
  );
}
root.render(<Application />);
