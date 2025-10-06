import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    responseType: "json"
});

export default apiClient;
