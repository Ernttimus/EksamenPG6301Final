import { Link } from "react-router-dom";
import React from "react";
import { useLoading } from "../useLoading";
import { fetchJSON } from "../fetchJSON";

function ElementCard({ elements: { _id, title } }) {
  return (
    <>
      <h3>{title}</h3>
      <div>{_id}</div>
    </>
  );
}

export function ChatRooms() {
  const { loading, error, data } = useLoading(async () =>
    fetchJSON("/api/elements"),
  );

  if (loading) {
    return <div>loading...</div>;
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
    <div id="container">
      <div id="nav">
        <h1 className={"h1header"}>Element In Database</h1>

        <p className={"p1"}>
          <Link to="/">Home</Link>
        </p>
        <p className={"p2"}>
          <Link to="/elements">Elements</Link>
        </p>
        <p className={"p3"}>
          <Link to="/elements/new">Add New Element</Link>
        </p>
      </div>

      <div id="content-container">
        <ul>
          {data.map((elements) => (
            <li className={"users"} key={elements._id}>
              <ElementCard elements={elements} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
