import axios from "axios";

const api = axios.create({
   baseURL: window.location.href.match('localhost') ? "http://localhost:3000" : 'https://project-hermes-backend.onrender.com'
});

api.defaults.withCredentials = true;

export default api;