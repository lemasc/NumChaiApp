export type Document<T extends Record<string, unknown>> = T & {
  id: string;
  created: string;
  updated: string;
};

export type Post = {
  title: string;
  content: string;
  likes: number;
};
