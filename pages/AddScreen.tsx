import React, { useState } from "react";
import { View, Button, TextInput, StyleSheet, Text } from "react-native";
import pb from "../plugins/pocketbase";

export default function AddScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const cancle = async () => {
    navigation.navigate("Home");
  };

  const getData = async () => {};

  const post = async () => {
    const newPost = {
      title,
      content,
    };
    const record = await pb.collection("todo").create(newPost);
    console.log(record);
    setTitle("");
    setContent("");
    getData();
    navigation.goBack("Home");
  };

  const styles = StyleSheet.create({
    header: {
      textAlign: "center",
      fontSize: 25,
      marginTop: 15,
    },

    title: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      fontSize: 15,
    },

    content: {
      margin: 12,
      borderWidth: 1,
      padding: 10,
      height: 120,
      fontSize: 15,
    },

    btn: {
      width: "100%",
      flexDirection: "row",
      alignItems: "stretch",
    },
  });

  return (
    <View>
      <Text style={styles.header}>เพิ่มโพสต์</Text>

      <TextInput
        style={styles.title}
        onChangeText={setTitle}
        value={title}
        placeholder="ชื่อเรื่อง"
      />

      <TextInput
        style={styles.content}
        onChangeText={setContent}
        value={content}
        placeholder="เนื้อหา"
      />

      <View style={styles.btn}>
        <View style={{ flexGrow: 1 }}>
          <Button title="ยกเลิก" onPress={cancle} />
        </View>

        <View style={{ flexGrow: 1 }}>
          <Button title="โพสต์" onPress={post} />
        </View>
      </View>
    </View>
  );
}