import { fetchJSON } from "../fetchJSON";
import { useEffect, useState } from "react";

export function LoginButton() {
  const [authorizationUrl, setAuthorizationUrl] = useState();
  async function generateAuthorizationUrl() {
    // Get the location of endpoints from Google
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

  return <a href={authorizationUrl}>Log in with Google</a>;
}
