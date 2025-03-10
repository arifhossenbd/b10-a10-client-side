import { useEffect, useState } from "react";
import crudOperation from "./apiClient";

const GetAPI = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await crudOperation("GET", endpoint);
        setData(response);
      } catch (error) {
        console.error("Error fetching reviews", error);
      } finally{
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);
  return {loading, data};
};

export default GetAPI;
