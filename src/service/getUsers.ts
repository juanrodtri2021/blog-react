import { api } from "./api";

export const users = (page: number) => api.get(`/user?page=${page}&limit=10`);