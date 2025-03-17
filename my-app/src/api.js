import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api'; // URL of backend

export const fetchData = async () => {
    try {
        const response = await axios.get(`${API_BASE}/data`);
        return response.data;
    } catch (error) {
        console.error("API error:", error);
        return [];
    }
};