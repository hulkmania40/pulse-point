import axiosClient from "./axiosClient";
import type { AxiosRequestConfig } from "axios";

const attachAuthHeader = (): AxiosRequestConfig => {
	const token = localStorage.getItem("access_token");
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};

export const _get = async <T>(url: string): Promise<T> => {
	const response = await axiosClient.get<T>(url, attachAuthHeader());
	return response.data;
};

export const _post = async <T, D>(url: string, data: D): Promise<T> => {
	const response = await axiosClient.post<T>(url, data, attachAuthHeader());
	return response.data;
};

export const _put = async <T, D>(url: string, data: D): Promise<T> => {
	const response = await axiosClient.put<T>(url, data, attachAuthHeader());
	return response.data;
};

export const _delete = async <T>(url: string): Promise<T> => {
	const response = await axiosClient.delete<T>(url, attachAuthHeader());
	return response.data;
};
