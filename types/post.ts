export type Document<T extends Record<string, unknown>> = T & {
  id: string;
  created: string;
  updated: string;
};

export type Post = Document<{
  title: string;
  content: string;
}>;
