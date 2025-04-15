import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/items'; // URL of backend

export const fetchData = async () => {
    try {
        const response = await axios.get(`${API_BASE}`);
        const data = response.data;
        console.log("Fetched data from backend:", data);
        return Array.isArray(data.items) ? data.items : [];
    } catch (error) {
        console.error("API error:", error);
        return [];
    }
};