import React, { useEffect, useState } from "react";

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed ${res.status}`);
  }
  return await res.json();
}

export function Login() {
  const [redirectUrl, setRedirectUrl] = useState();
  useEffect(async () => {
    const { authorization_endpoint } = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration",
    );

    const parameters = {
      response_type: "token",
      client_id:
        "786182536509-5d2g2178n7q83a9ci4e0450ihhrqffau.apps.googleusercontent.com",
      scope: "email profile",
      redirect_uri: window.location.origin + "/login/callback", // Corrected property name
    };

    setRedirectUrl(
      authorization_endpoint + "?" + new URLSearchParams(parameters),
    );
  }, []);

  return (
    <div>
      <h1>Login Page</h1>
      <a href={redirectUrl}>Do login</a>{" "}
    </div>
  );
}
