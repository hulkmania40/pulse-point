import axios from "axios";
import { handleLogout } from "@/utils/authUtils";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const axiosClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Track if logout is already triggered (avoid multiple calls)
let hasLoggedOut = false;

axiosClient.interceptors.response.use(
	(response) => {
		const detail = response?.data?.detail;
		if (detail === "Invalid token") {
			if (!hasLoggedOut) {
				hasLoggedOut = true;
				// toast.error("Session expired. You've been logged out.");
				handleLogout().finally(() => {
					window.location.href = "/";
				});
			}
		}
		return response;
	},
	(error) => {
		const detail = error?.response?.data?.detail
		if (detail === "Invalid token") {
			if (!hasLoggedOut) {
				hasLoggedOut = true;
				// toast.error("Session expired. You've been logged out.");
				handleLogout().finally(() => {
					window.location.href = "/";
				});
			}
		}
		return Promise.reject(error);
	}
);
