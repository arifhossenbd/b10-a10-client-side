import { useEffect, useState } from "react";
import crudOperation from "./apiClient";

const GetAPI = (endpoint, page = 1, limit = 6) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await crudOperation("GET", `${endpoint}?page=${page}&limit=${limit}`);
        setData(response);
        setTotalPages(response?.totalPage || 1);
      } catch (error) {
        console.error("Error fetching reviews", error);
      } finally{
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint, page, limit]);
  return {loading, data, totalPages};
};

export default GetAPI;
