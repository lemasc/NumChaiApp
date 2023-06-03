import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  FlatList,
  View,
  RefreshControl,
  Button,
  Pressable,
} from "react-native";
import dayjs from "../plugins/dayjs";
import pb from "../plugins/pocketbase";
import { usePostLists } from "../plugins/posts";
import { Post, Document } from "../types/post";
import { N } from "../types/navigation";

function PostComponent({
  item,
  onPress,
}: { item: Document<Post> } & {
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          padding: 20,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, paddingBottom: 10 }}>
          {item.title}
        </Text>
        <Text>สร้างเมื่อ {dayjs(item.created).format("LLL น.")}</Text>
        <Text>{item.content}</Text>
      </View>
    </Pressable>
  );
}

function HomeScreen({ navigation, route }: N<"Home">) {
  const { data, isLoading, mutate } = usePostLists();
  return (
    <View style={{ padding: 18 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <PostComponent
            item={item}
            onPress={() => {
              navigation.navigate("View", {
                postId: item.id,
              });
            }}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={mutate} />
        }
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default HomeScreen;
