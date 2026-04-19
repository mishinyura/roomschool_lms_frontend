import { API_ENDPOINTS, API_URL } from '@/configs/api.endpoints';
import apiClient from './httpClient.js';

export const communicationApi = {

    async getHistoryMessages() {
        const url = API_URL + API_ENDPOINTS.COMMUNICATION.HISTOPRY_MESSAGES;
        const { data } = await apiClient.get(url, {
            headers: {
                'Authorization': 'test'
            }
        });
        return data;
    },

    async sendMessage(message) {
        const url = API_URL + API_ENDPOINTS.COMMUNICATION.SEND_MESSSAGE;
        const body = {
            "user": "test-user",
            "chat": 1,
            "message": message
        }
        const {data} = await apiClient.post(url, body, {
            headers: {
                'Content-Type': 'application/json', 
            }
        });
        return data;
    }
};