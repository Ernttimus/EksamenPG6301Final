import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ListElements } from "./ListElements";
import { AddNewElements } from "./AddNewElements";

import { Profile } from "./Profile";
import { Frontpage } from "./frontpage";
import React from "react";
import { LoginButton } from "./Login";
import { NewCallback } from "./Callback";

export function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/elements"} element={<ListElements />} />
        <Route path={"/elements/new"} element={<AddNewElements />} />
        <Route path={"/login"} element={<LoginButton />} />
        <Route path={"/login/callback"} element={<NewCallback />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/"} element={<Frontpage />} />
      </Routes>
    </BrowserRouter>
  );
}
