import { API_ENDPOINTS } from '@/configs/api.config.js';
import { TokenResponseSchema } from '@/schemas/authSchema.js';
import axios from 'axios';
import apiClient from './httpClient.js';

export const authApi = {
    async login({ username, password }) {
        const payload = new URLSearchParams({ username, password });
        const url = process.env.VUE_APP_API_URL + API_ENDPOINTS.AUTH.LOGIN;

        const { data } = await apiClient.post(url, payload, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return TokenResponseSchema.parse(data);
    },

    async refreshToken() {
        let url = process.env.VUE_APP_API_URL + API_ENDPOINTS.AUTH.GET;
        const { data } = await axios.get(
            url,
            {},
            { withCredentials: true}
        );
        return TokenResponseSchema.parse(data);
    },

    async logout() {
        let url = process.env.VUE_APP_API_URL + API_ENDPOINTS.AUTH.LOGOUT;
        return apiClient.post(url);
    }
};