import { useLoading } from "../useLoading";
import { fetchJSON } from "../fetchJSON";
import { useState } from "react";

export function Profile() {
  const [user, setUser] = useState("guest");
  const { loading, error } = useLoading(async () => {
    return setUser(await fetchJSON("/api/login"));
    // return await fetchJSON("/api/login");
  });

  if (loading) {
    return <div>please wait...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error.toString()}</div>
      </div>
    );
  }

  return (
    <div>
      <h1>
        Profile for {user.name} ({user.email})
      </h1>
      <div>
        <img src={user.picture} alt={"profile picture"} />
      </div>
    </div>
  );
}
