import axios from 'axios';

const api = axios.create({
    baseURL: `https://api.imgur.com/3`
})

export default api;
