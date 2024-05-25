import { api } from "./api";

export const getTags = () => api.get<{ data: string[] }>('/tag?page=1&limit=10');