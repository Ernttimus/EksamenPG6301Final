import { useLoading } from "../useLoading";
import { fetchJSON } from "../fetchJSON";
import { useEffect } from "react";

export function NewUser() {
  const { data } = useLoading(async () => {
    return await fetchJSON("/api/login");
  });

  useEffect(() => {
    const createUser = async () => {
      try {
        await fetch("/api/createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
          }),
        });
      } catch (error) {}
    };

    if (data) {
      createUser();
    }
  }, [data]);
}
