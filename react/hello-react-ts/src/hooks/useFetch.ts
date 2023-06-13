import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch<T>(url: string): {
  isLoading: boolean;
  data: T[];
  error: any;
  fetchData: () => void;
} {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { isLoading, data, error, fetchData };
}
