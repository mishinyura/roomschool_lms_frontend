import { API_ENDPOINTS } from '@/configs/api.endpoints.js';
import { TokenResponseSchema } from '@/schemas/authSchema.js';
import apiClient from './httpClient.js';

export const authApi = {
    async check() {
        const url = process.env.VUE_APP_API_URL + API_ENDPOINTS.AUTH.CHECK;
        return apiClient.get(url);
    },

    async login({ username, password }) {
        const payload = new URLSearchParams({ username, password });
        const url = process.env.VUE_APP_API_URL + API_ENDPOINTS.AUTH.LOGIN;

        const { data } = await apiClient.post(url, payload, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return TokenResponseSchema.parse(data);
    },

    async refreshToken() {
        let url = process.env.VUE_APP_API_URL + API_ENDPOINTS.AUTH.REFRESH;
        const { data } = await apiClient.get(
            url,
            {},
            { withCredentials: true}
        );
        return TokenResponseSchema.parse(data);
    },

    async logout() {
        let url = process.env.VUE_APP_API_URL + API_ENDPOINTS.AUTH.LOGOUT;
        return apiClient.get(url);
    }
};