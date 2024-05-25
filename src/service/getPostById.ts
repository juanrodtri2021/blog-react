import api from "./api";



export const postById = (postId: number) => api.get<{ data: Post }>(`/post/${postId}`);