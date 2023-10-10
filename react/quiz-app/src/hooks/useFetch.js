import axios from "axios";
import { useEffect, useState } from "react";

/* Custom hook to encapsulate data fetching. */
export default function useFetch(url) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    axios
      .get(url)
      .then((response) => {
        if (Array.isArray(response.data)) {
          console.log("Fetched an array of items");
          setData(response.data);
        } else {
          console.log("Fetched a single item");
          setData([response.data]);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    simulateLoading().then(fetchData);
    // fetchData();

    // return () => {
    //   console.log("useFetch: cleanup");
    // };
  }, [url]);

  function simulateLoading() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([]);
      }, 500);
    });
  }

  return { isLoading, data, error, fetchData };
}
