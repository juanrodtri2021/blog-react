import api from "./api";

export const users = () => api.get('/user');