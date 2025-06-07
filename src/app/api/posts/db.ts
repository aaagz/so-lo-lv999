export type Post = {
  id: number;
  title: string;
  content: string;
};

export const db = {
  posts: [] as Post[],
  nextId: 1,
};