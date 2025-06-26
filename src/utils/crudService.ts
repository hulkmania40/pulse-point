import axiosClient from './axiosClient';

export const _get = async <T>(url: string): Promise<T> => {
  const response = await axiosClient.get<T>(url);
  return response.data;
};

export const _post = async <T, D>(url: string, data: D): Promise<T> => {
  const response = await axiosClient.post<T>(url, data);
  return response.data;
};

export const _put = async <T, D>(url: string, data: D): Promise<T> => {
  const response = await axiosClient.put<T>(url, data);
  return response.data;
};

export const _delete = async <T>(url: string): Promise<T> => {
  const response = await axiosClient.delete<T>(url);
  return response.data;
};
