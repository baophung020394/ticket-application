import axiosClient from './axiosClient';

export const getListUser = () => {
  return axiosClient.get('/users');
};

export const getUser = (id: string) => {
  return axiosClient.get(`/users/${id}`);
};
