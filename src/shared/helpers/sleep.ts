import { useEffect, useState } from "react";

export function sleep(delay = 0, returnedData: any, value = "") {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<any>();
  useEffect(()=> {
    new Promise((resolve, reject) => {
      setLoading(true);
      if(value === "fail") {
        reject("Service Error");
        }
        setTimeout(resolve, delay);
      })
    .then(r => setData(returnedData))
    .catch(er => setError(er))
    .finally(() => setLoading(false));
  }, [value])

  return {
    loading,
    error,
    data
  };
}