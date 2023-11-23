import { useLoading } from "../useLoading";
import { fetchJSON } from "../fetchJSON";
import { useState } from "react";
import { NewUser } from "./newUserScript";
import { Link } from "react-router-dom";

export function Profile() {
  const [user, setUser] = useState("guest");
  const { loading, error } = useLoading(async () => {
    return setUser(await fetchJSON("/api/login"));
    // return await fetchJSON("/api/login");
  });

  if (loading) {
    return (
      <div id="container">
        <div id="nav">
          <h1 className={"h1header"}>Chat Mania</h1>
          <NewUser />
          <div>
            <Link to="/">Home</Link>
          </div>

          <div>
            <Link to="/elements">Chat Room</Link>
          </div>

          <div>
            <Link to="/login">Login</Link>
          </div>

          <div>
            <Link to="/profile">Profile</Link>
          </div>
        </div>
        <div id="content-container">
          <h3>Loading...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="container">
        <div id="nav">
          <h1 className={"h1header"}>Chat Mania</h1>
          <NewUser />
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
          <div>
            <h1>you are currently logged in as a GUEST</h1>
            <h1>Click under to log in</h1>
            <h1>
              <Link to="/login">Login</Link>
            </h1>

            <div></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="container">
      <div id="nav">
        <h1 className={"h1header"}>Chat Mania</h1>
        <NewUser />
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
        <div>
          <h1>
            Profile for {user.name} ({user.email})
          </h1>
          <div>
            <img src={user.picture} alt={"profile picture"} />
          </div>
        </div>
      </div>
    </div>
  );
}
