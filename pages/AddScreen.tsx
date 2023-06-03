import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert, ScrollView } from "react-native";

import { TextInput, Button } from "react-native-paper";
import { useSWRConfig } from "swr";
import pb from "../plugins/pocketbase";
import { N } from "../types/navigation";
import { Document, Post } from "../types/post";

export default function AddScreen({
  navigation,
  post,
}: (N<"Add"> | N<"Edit">) & {
  post?: Document<Post>;
}) {
  const { mutate } = useSWRConfig();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const cancel = async () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const submitPost = async () => {
    if (!title || !content) {
      Alert.alert("You must provide a title and a content for a post!.");
      return;
    }
    const newPost = {
      title,
      content,
    };
    if (post) {
      await pb.collection("posts").update(post.id, newPost);
    } else {
      await pb.collection("posts").create(newPost);
    }
    mutate("posts");
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    header: {
      fontFamily: "Athiti_700Bold",
      textAlign: "center",
      fontSize: 25,
      marginTop: 25,
    },

    title: {
      margin: 12,
      fontSize: 15,
      borderRadius: 10,
    },

    content: {
      margin: 12,
      fontSize: 15,
      borderRadius: 10,
    },

    btn: {
      width: "100%",
      flexDirection: "row",
      alignItems: "stretch",
      paddingHorizontal: 10,
    },
    btnWrapper: {
      padding: 5,
      flexGrow: 1,
      flexShrink: 1,
    },
  });

  return (
    <ScrollView style={{ backgroundColor: "#F3E9E9" }}>
      <Text style={styles.header}>{post ? "แก้ไข" : "เพิ่ม"}โพสต์</Text>

      <TextInput
        style={styles.title}
        onChangeText={setTitle}
        value={title}
        label="ชื่อเรื่อง"
      />

      <TextInput
        style={styles.content}
        onChangeText={setContent}
        value={content}
        label="เนื้อหา"
        multiline
        numberOfLines={5}
      />

      <View style={styles.btn}>
        <View style={styles.btnWrapper}>
          <Button
            mode="outlined"
            style={{ backgroundColor: "white" }}
            onPress={cancel}
          >
            ยกเลิก
          </Button>
        </View>

        <View style={styles.btnWrapper}>
          <Button mode="contained" onPress={submitPost}>
            โพสต์
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
