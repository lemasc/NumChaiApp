import { useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
import { Document, Leaderboard, Post } from "../types/post";
import pb from "./pocketbase";

export const usePostLists = () => {
  const { mutate } = useSWRConfig();
  const { data, ...rest } = useSWR("posts", () => {
    return pb.collection("posts").getFullList<Document<Post>>({
      sort: "-created",
    });
  });
  useEffect(() => {
    if (data) {
      data.map((item) => {
        mutate(["posts", item.id], item, {
          revalidate: false,
        });
      });
    }
  }, [data]);
  return {
    data,
    ...rest,
  };
};

export const usePost = (postId: string | null) => {
  return useSWR(postId ? ["posts", postId] : null, (postId: string) => {
    return pb.collection("posts").getOne<Document<Post>>(postId);
  });
};

export const useLeaderboard = () => {
  return useSWR("leaderboard", () => {
    return pb.collection("posts").getFullList<Document<Leaderboard>>({
      sort: "-likes",
      fields: "id,title,likes,created,updated",
    });
  });
};
