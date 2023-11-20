import React, { useEffect } from "react";
import { fetchJSON } from "../fetchJSON";

export function Login() {
  useEffect(() => {
    async function fetchData() {
      const { authorization_endpoint } = await fetchJSON(
        "https://accounts.google.com/.well-known/openid-configuration",
      );

      const parameters = {
        response_type: "token",
        client_id:
          "786182536509-5d2g2178n7q83a9ci4e0450ihhrqffau.apps.googleusercontent.com",
        scope: "email profile",
        redirect_uri: window.location.origin + "/login/callback",
      };
      window.location.href =
        authorization_endpoint + "?" + new URLSearchParams(parameters);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Please wait...</h1>
    </div>
  );
}
