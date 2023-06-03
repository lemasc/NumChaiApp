import useSWR from "swr";
import { Post } from "../types/post";
import pb from "./pocketbase";

export const usePostLists = () => {
  return useSWR("posts", () => {
    return pb.collection("posts").getFullList<Post>({
      sort: "-created",
    });
  });
};
