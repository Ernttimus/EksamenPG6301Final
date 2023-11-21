import { useLoading } from "../useLoading";
import { fetchJSON } from "../fetchJSON";

export function Profile() {
  const { loading, error, data } = useLoading(async () => {
    return await fetchJSON("/api/login");
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
        Profile for {data.name} ({data.email})
      </h1>
      <div>
        <img src={data.picture} alt={"profile picture"} />
      </div>
    </div>
  );
}
