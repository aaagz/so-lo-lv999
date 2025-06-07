export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};
