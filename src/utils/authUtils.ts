import { _post } from '@/utils/crudService';

export const handleLogout = async () => {
	try {
		const token = localStorage.getItem('access_token');

		// Optional: Inform server to invalidate the token
		if (token) {
			try {
				const res: any = await _post('auth/logout', {});
				console.log(res.message); // You can toast this inside a React component
			} catch (apiError) {
				console.warn('Logout API call failed, proceeding anyway.', apiError);
			}
		}
	} finally {
		// Clear localStorage regardless of API success
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token'); // if you store it
		localStorage.removeItem('user');
	}
};
