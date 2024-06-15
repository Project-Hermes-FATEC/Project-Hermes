import axios from "axios";

const api = axios.create({
//   baseURL: "http://localhost:3000"
     baseURL: 'https://project-hermes-backend.onrender.com'
});

api.defaults.withCredentials = true;

export default api;