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
      paddingVertical: 10,
      fontFamily: "Athiti_700Bold",
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

    Count: {
      marginRight: 8,
      fontSize: 20,
      fontFamily: "Athiti_400Regular",
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
        <Text style={{ fontFamily: "Athiti_400Regular", fontSize: 16 }}>
          {dayjs(post.created).format("LLL น.")}
        </Text>
        <Text style={{ fontFamily: "Athiti_400Regular", fontSize: 16 }}>
          {post.content}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Text style={styles.Count}>{post.likes}</Text>
          <TouchableOpacity style={{}} onPressOut={onPressLike}>
            <AntDesign
              name={recentlyAddLikes ? "like1" : "like2"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
