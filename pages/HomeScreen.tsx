import React, { useState, useEffect, useMemo, useLayoutEffect } from "react";
import {
  FlatList,
  View,
  RefreshControl,
  StyleSheet,
  Pressable,
} from "react-native";
import { usePostLists } from "../plugins/posts";
import { N } from "../types/navigation";
import { FAB, TextInput } from "react-native-paper";
import PostComponent from "../components/PostComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function HomeScreen({ navigation }: N<"Home">) {
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, isValidating, mutate } = usePostLists();
  const items = useMemo(() => {
    if (search === "") return data;
    return data.filter((item) => item.title.includes(search));
  }, [search, data]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{ flexDirection: "row" }}>
            <Pressable
              onPress={() => {
                navigation.navigate("Leaderboard");
              }}
              style={styles.HeaderRightBtn}
            >
              <MaterialCommunityIcons name="podium" size={24} color="black" />
            </Pressable>
          </View>
        );
      },
    });
  }, []);

  return (
    <View style={{ height: "100%", backgroundColor: "#F3E9E9" }}>
      <View style={{ padding: 20 }}>
        <TextInput
          label="ค้นหา"
          value={search}
          onChangeText={(text) => setSearch(text.trim())}
        />
      </View>
      <FlatList
        style={{ padding: 18, paddingBottom: 20 }}
        data={items}
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
          <RefreshControl
            refreshing={isLoading || isValidating}
            onRefresh={mutate}
          />
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
  HeaderRightBtn: {
    padding: 10,
  },
});

export default HomeScreen;
