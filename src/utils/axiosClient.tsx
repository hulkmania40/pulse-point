import axios from 'axios';
import { toast } from 'sonner';
import { _post } from './crudService';
import { handleLogout } from '@/utils/authUtils';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const axiosClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosClient.interceptors.response.use(
	(response) => {
		const details = response?.data?.details;
		if (details === 'Invalid Token') {
			handleLogout().then(() => {
				toast.error("Session expired. You've been logged out.");
				window.location.href = '/';
			});
		}
		return response;
	},
	(error) => {
		const details = error?.response?.data?.details;
		if (details === 'Invalid Token') {
			handleLogout().then(() => {
				toast.error("Session expired. You've been logged out.");
				window.location.href = '/';
			});
		}
		return Promise.reject(error);
	}
);
