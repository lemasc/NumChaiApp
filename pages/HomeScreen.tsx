import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  FlatList,
  View,
  RefreshControl,
  Button,
  Pressable,
  StyleSheet,
} from "react-native";
import dayjs from "../plugins/dayjs";
import { usePostLists } from "../plugins/posts";
import { Post, Document } from "../types/post";
import { N } from "../types/navigation";
import { FAB } from "react-native-paper";
import {
  useFonts,
  Athiti_400Regular,
  Athiti_700Bold,
} from "@expo-google-fonts/athiti";

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
        <Text
          style={{
            fontSize: 24,
            paddingBottom: 10,
            fontFamily: "Athiti_700Bold", // Use the Athiti_700Bold font
          }}
        >
          {item.title}
        </Text>
        <Text style={{ fontFamily: "Athiti_400Regular" }}>
          สร้างเมื่อ {dayjs(item.created).format("LLL น.")}
        </Text>
        <Text>{item.content}</Text>
      </View>
    </Pressable>
  );
}

function HomeScreen({ navigation, route }: N<"Home">) {
  const { data, isLoading, mutate } = usePostLists();
  return (
    <View style={{ height: "100%", backgroundColor: "#F3E9E9" }}>
      <FlatList
        style={{ padding: 18, paddingBottom: 20 }}
        data={data}
        renderItem={({ item }) => (
          <PostComponent
            item={item}
            onPress={() => {
              console.log("HWEL");
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
