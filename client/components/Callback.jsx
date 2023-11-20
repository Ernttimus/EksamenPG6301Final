import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Callback() {
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const { access_token } = Object.fromEntries(
        new URLSearchParams(window.location.hash.substring(1)),
      );
      console.log(access_token);

      await fetch("/api/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ access_token }),
      });
    }

    navigate("/");
    fetchData();
  });

  return <h1>Login callback</h1>;
}
