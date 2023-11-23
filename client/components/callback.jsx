import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../style.css";
export function NewCallback() {
  const navigate = useNavigate();
  const callbackParameters = Object.fromEntries(
    new URLSearchParams(window.location.hash.substring(1)),
  );

  async function handleCallback() {
    const { access_token } = callbackParameters;
    await fetch("/api/login/access_token", {
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
