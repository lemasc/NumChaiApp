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
  Alert,
} from "react-native";
import { usePost } from "../plugins/posts";
import { useSWRConfig } from "swr";

export default function ViewScreen({ navigation, route }: N<"View">) {
  const { postId } = route.params ?? {};
  const { mutate } = useSWRConfig();
  const { data: post } = usePost(postId ?? null);
  const [recentlyAddLikes, setRecentlyPressLike] = useState(false);
  const [recentlyAddDisLikes, setRecentlyPressDisLike] = useState(false);

  if (!post) {
    return null;
  }

  const deletePost = async () => {
    Alert.alert("", "คุณต้องการจะลบโพสต์นี้ใช่หรือไม่", [
      {
        style: "cancel",
        text: "ยกเลิก",
      },
      {
        text: "ลบ",
        onPress: async () => {
          try {
            await pb.collection("posts").delete(post.id);
          } catch {}
          mutate("posts");
          navigation.goBack();
        },
      },
    ]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{ flexDirection: "row" }}>
            <Pressable
              onPress={() => {
                navigation.navigate("Edit", {
                  postId,
                });
              }}
              style={styles.HeaderRightBtn}
            >
              <AntDesign name="edit" size={20} />
            </Pressable>

            <Pressable style={styles.HeaderRightBtn} onPress={deletePost}>
              <AntDesign name="delete" size={20} />
            </Pressable>
          </View>
        );
      },
    });
  }, [postId]);

  const styles = StyleSheet.create({
    Title: {
      fontSize: 25,
      marginTop: 15,
      backgroundColor: "white",
      marginHorizontal: 20,
      borderRadius: 10,
      textAlignVertical: "center",
      padding: 20,
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
    HeaderRightBtn: {
      padding: 10,
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
    try {
      mutate(
        ["posts", post.id],
        await pb.collection("posts").update(post.id, updateData)
      );
    } catch {}
    setRecentlyPressLike((v) => !v);
  };

  const onPressDisLike = async () => {
    const updateData: Partial<Post> = {
      dislikes: recentlyAddDisLikes ? post.dislikes - 1 : post.dislikes + 1,
    };
    try {
      mutate(
        ["posts", post.id],
        await pb.collection("posts").update(post.id, updateData)
      );
    } catch {}
    setRecentlyPressDisLike((v) => !v);
  };

  return (
    <ScrollView style={styles.View}>
      <Text style={styles.Title}>{post.title}</Text>
      <View style={styles.Content}>
        <Text
          style={{
            fontFamily: "Athiti_400Regular",
            fontSize: 16,
            color: "gray",
            paddingVertical: 5,
          }}
        >
          {dayjs(post.created).format("LLL น.")}
        </Text>
        <Text style={{ fontFamily: "Athiti_400Regular", fontSize: 16 }}>
          {post.content}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Text style={styles.Count}>{post.dislikes}</Text>

          <TouchableOpacity
            style={{ marginRight: 12 }}
            onPressOut={onPressDisLike}
          >
            <AntDesign
              name={recentlyAddDisLikes ? "dislike1" : "dislike2"}
              size={24}
              color="black"
            />
          </TouchableOpacity>

          <Text style={styles.Count}>{post.likes}</Text>

          <TouchableOpacity onPressOut={onPressLike}>
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
