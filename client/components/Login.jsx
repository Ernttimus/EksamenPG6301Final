import { useEffect, useState } from "react";
import { fetchJSON } from "../fetchJSON";

export function Login() {
  const [authorizationUrl, setAuthorizationUrl] = useState();

  async function generateAuthorizationUrl() {
    const { authorization_endpoint } = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration",
    );
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
