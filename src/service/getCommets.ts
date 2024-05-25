import api from "./api";

export const commentsByPostId = (postId:number) => api.get(`/post/${postId}`);