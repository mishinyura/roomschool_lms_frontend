import { API_ENDPOINTS } from "@/configs/api.config.js";
import { apiClient } from "./httpClient.js";

export async function getStudies() {
    return apiClient.get(API_ENDPOINTS.STUDY.LIST);
}

export async function getLesson(id) {
    return apiClient.get(API_ENDPOINTS.STUDY.GET_BY_ID(id));
}