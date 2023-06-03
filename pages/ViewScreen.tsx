import React, { useState, useEffect } from "react";
import pb from "../plugins/pocketbase";
import { N } from "../types/navigation";
import { Post, Document } from "../types/post";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import dayjs from "../plugins/dayjs";

export default function ViewScreen({ navigation, route }: N<"View">) {
  const [post, setPost] = useState<Document<Post>>();
  const { postId } = route.params ?? {};
  const getData = async () => {
    const post = await pb.collection("posts").getOne<Document<Post>>(postId);
    setPost(post);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!post) {
    return null;
  }

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
       paddingVertical: 10
    },

    Content: {
      backgroundColor: "white",
      marginHorizontal: 20,
      marginTop: 20,
      borderRadius: 10,
      padding: 15,
    },
  });

  return (
    <View>
      <Text style={styles.Title}>{post.title}</Text>
      <View style={styles.Content}>
        <Text>{dayjs(post.created).format("LLL น.")}</Text>
        <Text>{post.content}</Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity style={{}}>
            <Image
              source={{
                uri: "https://seeklogo.com/images/F/facebook-like-logo-32FAB6926D-seeklogo.com.png",
              }}
              style={{
                width: 30,
                height: 30,
                marginVertical: 5,
                marginEnd: 18
              }}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
