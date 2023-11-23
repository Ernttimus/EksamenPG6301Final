import { useEffect, useState } from "react";

export function useLoading(loadingFunction) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  async function load() {
    try {
      setLoading(true);
      setData(await loadingFunction());
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);
  return { loading, error, data };
}

export function useLoading2(loadingFunction2) {
  const [loading2, setLoading2] = useState(true);
  const [error2, setError2] = useState();
  const [data2, setData2] = useState();

  async function load2() {
    try {
      setLoading2(true);
      setData2(await loadingFunction2());
    } catch (error) {
      setError2(error);
    } finally {
      setLoading2(false);
    }
  }

  useEffect(() => {
    load2();
  }, []);
  return { loading2, error2, data2 };
}
