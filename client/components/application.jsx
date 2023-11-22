import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChatRooms } from "./chatRooms";
import { AddNewElements } from "./AddNewElements";

import { Profile } from "./profile";
import { Frontpage } from "./frontpage";
import React from "react";
import { LoginButton } from "./login";
import { NewCallback } from "./callback";

export function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/elements"} element={<ChatRooms />} />
        <Route path={"/elements/new"} element={<AddNewElements />} />
        <Route path={"/login"} element={<LoginButton />} />
        <Route path={"/login/callback"} element={<NewCallback />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/"} element={<Frontpage />} />
      </Routes>
    </BrowserRouter>
  );
}
