import axios from "axios";
import { useEffect, useState } from "react";

/**
 * Custom hook to encapsulate data fetching.
 *
 * Uses useEffect hook with URL dependency. When dependencies change, the effect will be triggered.
 * Inside the effect, fetch data, and based on that, update the hook's state using setState.
 * This will cause a re-render of the component where you're using this custom hook.
 *
 * */
export default function useFetch(url, timeToWaitBeforeFetch = 0) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = () => {
    console.log("useFetch: fetching data...");
    setLoading(true);
    setError(null);
    axios
      .get(url)
      .then((response) => {
        // set state with the received data:
        if (Array.isArray(response.data)) {
          if (response.data.length == 0) {
            console.log("Fetched empty array", response.data);
          } else {
            console.log("Fetched an array of items", response.data);
          }

          setData(response.data);
        } else if (data) {
          console.log("Fetched a single item");
          setData([response.data]);
        } else {
          console.log("Nothing fetched: []");
          setData([]);
        }
      })
      .catch((err) => {
        // set state with the error:
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (timeToWaitBeforeFetch) {
      simulateLoading(timeToWaitBeforeFetch).then(fetchData);
    } else {
      // console.log("No wait simulation");
      fetchData();
    }

    // return () => {
    //   console.log("useFetch: cleanup");
    // };
  }, [url]);

  function simulateLoading(duration) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("resolved.");
      }, duration);
    });
  }

  return { isLoading, data, error, fetchData };
}
