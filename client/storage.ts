import { ApiSigninResponse } from '@/models/api/signin-response';

export const readUser = (): ApiSigninResponse | null => {
	if (typeof window === 'undefined') return null;
	const u = localStorage.getItem('user');
	if (!u) return null;
	return JSON.parse(u) as ApiSigninResponse;
};

export const writeUser = (user: ApiSigninResponse) => {
	if (typeof window === 'undefined') return;
	localStorage.setItem('user', JSON.stringify(user));
};

export const deleteUser = () => {
	if (typeof window === 'undefined') return;
	localStorage.removeItem('user');
};
