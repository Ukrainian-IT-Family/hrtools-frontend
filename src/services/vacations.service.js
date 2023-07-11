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

export const acceptVacationAdmin = async (data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.post(`admin/vacation/${data}/accept`, null, headers);

  return result;
};

export const cancelVacationAdmin = async (data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.post(`admin/vacation/${data}/cancel`, null, headers);

  return result;
};
