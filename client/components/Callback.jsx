import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Callback() {
  const navigate = useNavigate();

  const callbackParameters = Object.fromEntries(
    new URLSearchParams(window.location.hash.substring(1)),
  );

  async function handleCallback() {
    // Get the values returned from the login provider. For Active Directory,
    // this will be more complex
    const { access_token } = callbackParameters;
    await fetch("/api/login/accessToken", {
      method: "POST",
      body: JSON.stringify({ access_token }),
      headers: {
        "content-type": "application/json",
      },
    });
    navigate("/");
  }

  useEffect(() => {
    handleCallback();
  }, []);

  return <div>Please wait...</div>;
}
