import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  FlatList,
  View,
  RefreshControl,
  Button,
} from "react-native";
import dayjs from "../plugins/dayjs";
import pb from "../plugins/pocketbase";
import { usePostLists } from "../plugins/posts";
import { Post } from "../types/post";

function PostComponent({ item }: { item: Post }) {
  return (
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
  );
}

function HomeScreen({ navigation }) {
  const { data, isLoading, mutate } = usePostLists();
  return (
    <View style={{ padding: 18 }}>
      <FlatList
        data={data}
        renderItem={PostComponent}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={mutate} />
        }
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default HomeScreen;
