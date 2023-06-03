import useSWR from "swr";
import { Post, Document } from "../types/post";
import pb from "./pocketbase";

export const usePostLists = () => {
  return useSWR("posts", () => {
    return pb.collection("posts").getFullList<Document<Post>>({
      sort: "-created",
    });
  });
};
