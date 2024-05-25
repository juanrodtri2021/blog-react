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

export const getPosts = () => api.get<{ data: Post }>('/post');