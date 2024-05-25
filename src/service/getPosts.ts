import { api } from "./api";

export interface Post {
  id: string;
  text: string;
  image: string;
  tags: string[];
  owner: {
    firstName: string;
    lastName: string;
  };
}

export const getPosts = (page: number) => api.get<{ data: Post }>(`/post?${page}=1&limit=10`);
export const getCommentsPost = (id: string) => api.get<{ data: Post }>(`/post/${id}/comment`);