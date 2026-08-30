import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

// Response interceptor for consistent error extraction
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const customError = {
            status: error.response?.status,
            message:
                error.response?.data?.error ||
                error.response?.data?.message ||
                error.message ||
                "An unexpected network error occurred",
            data: error.response?.data,
            originalError: error,
        };
        return Promise.reject(customError);
    }
);

export default apiClient;
