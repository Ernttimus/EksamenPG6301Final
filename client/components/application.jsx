import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ListElements } from "./ListElements";
import { AddNewElements } from "./AddNewElements";
import { Login } from "./Login";
import { Callback } from "./Callback";
import { Profile } from "./Profile";
import { Frontpage } from "./frontpage";
import React from "react";

export function Application() {
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
