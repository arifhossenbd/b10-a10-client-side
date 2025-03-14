import { useEffect, useState } from "react";
import crudOperation from "./apiClient";

const GetAPI = (endpoint, email = null, page = 1, limit = 6) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let url;
        if(email){
          url = `${endpoint}?email=${email}&page=${page}&limit=${limit}`;
        } else {
          url = `${endpoint}?page=${page}&limit=${limit}`;
        }
        const response = await crudOperation("GET", url);
        setData(response);
        setTotalPages(response?.totalPage || 1);
      } catch (error) {
        console.error("Error fetching reviews", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint, email, page, limit]);
  return { loading, data, setData, totalPages };
};

export default GetAPI;
