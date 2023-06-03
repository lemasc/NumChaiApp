import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  FlatList,
  View,
  RefreshControl,
  Button,
  StyleSheet,
} from "react-native";
import dayjs from "../plugins/dayjs";
import { usePostLists } from "../plugins/posts";
import { Post } from "../types/post";

import { FAB } from "react-native-paper";

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
    <View style={{ height: "100%" }}>
      <FlatList
        style={{ padding: 18, paddingBottom: 20 }}
        data={data}
        renderItem={PostComponent}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={mutate} />
        }
        keyExtractor={(item) => item.id}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("Add")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;
