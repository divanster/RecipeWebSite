import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Update with your actual API URL
});

export default api;
