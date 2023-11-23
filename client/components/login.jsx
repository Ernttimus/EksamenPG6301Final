import { fetchJSON } from "../fetchJSON";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function LoginButton() {
  const [authorizationUrl, setAuthorizationUrl] = useState();
  async function generateAuthorizationUrl() {
    const { authorization_endpoint } = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration",
    );
    // Tell Google how to authentication
    const parameters = {
      response_type: "token",
      client_id:
        "786182536509-5d2g2178n7q83a9ci4e0450ihhrqffau.apps.googleusercontent.com",
      redirect_uri: window.location.origin + "/login/callback",
      scope: "profile email",
    };
    setAuthorizationUrl(
      authorization_endpoint + "?" + new URLSearchParams(parameters),
    );
  }

  useEffect(() => {
    generateAuthorizationUrl();
  }, []);

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
        <div id="login-container">
          <div id={"chatMania"}>
            <h1> Chat Mania</h1>
          </div>

          <div id={"btn-div"}>
            <button id="loginBTN">
              <a href={authorizationUrl}>Login / register with Google</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
