import { useEffect, useState } from "react";

const UseFetchData = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      setError("");
      setData(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return { error, loading, data };
};

export default UseFetchData;
