import { api } from 'src/api';

export const getVacationsAdmin = async (data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.get(`admin/vacation?page=${data || 1}`, headers);

  return result;
};

export const getVacationsHr = async (data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.get(`admin/vacation?page=${data || 1}`, headers);

  return result;
};
