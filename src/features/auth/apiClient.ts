import axios from "axios";
import { getToken, removeToken } from "../../utils/storage.ts";
import {API_BASE_URL} from "../config.ts";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.error("Ошибка API:", error);
        if (error.response?.status === 401) {
            removeToken();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
