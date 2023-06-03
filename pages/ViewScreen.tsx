import React, { useState, useEffect, useLayoutEffect } from "react";
import pb from "../plugins/pocketbase";
import { N } from "../types/navigation";
import { Post, Document } from "../types/post";
import dayjs from "../plugins/dayjs";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { usePost } from "../plugins/posts";
import { useSWRConfig } from "swr";

export default function ViewScreen({ navigation, route }: N<"View">) {
  const { postId } = route.params ?? {};
  const { mutate } = useSWRConfig();
  const { data: post } = usePost(postId ?? null);
  const [recentlyAddLikes, setRecentlyPressLike] = useState(false);

  if (!post) {
    return null;
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable
            onPress={() => {
              navigation.navigate("Edit", {
                postId,
              });
            }}
          >
            <Text>Edit</Text>
          </Pressable>
        );
      },
    });
  }, [postId]);

  const styles = StyleSheet.create({
    Title: {
      textAlign: "center",
      fontSize: 25,
      marginTop: 15,
      backgroundColor: "white",
      marginHorizontal: 20,
      borderRadius: 10,
      textAlignVertical: "center",
      fontWeight: "bold",
      paddingVertical: 10,
    },

    Content: {
      backgroundColor: "white",
      marginHorizontal: 20,
      marginTop: 20,
      borderRadius: 10,
      padding: 15,
    },
    View: {
      backgroundColor: "#F3E9E9",
    },
  });

  const onPressLike = async () => {
    const updateData: Partial<Post> = {
      likes: recentlyAddLikes ? post.likes - 1 : post.likes + 1,
    };
    mutate(
      ["posts", post.id],
      await pb.collection("posts").update(post.id, updateData)
    );
    setRecentlyPressLike((v) => !v);
  };

  return (
    <ScrollView style={styles.View}>
      <Text style={styles.Title}>{post.title}</Text>
      <View style={styles.Content}>
        <Text>{dayjs(post.created).format("LLL น.")}</Text>
        <Text>{post.content}</Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity style={{}}>
            <AntDesign name="like2" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
