import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (apiCall) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall();
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.message || 'Something went wrong');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};