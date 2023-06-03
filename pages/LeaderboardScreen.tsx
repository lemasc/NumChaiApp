import React from "react";
import {
  View,
  Text,
  RefreshControl,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { useLeaderboard } from "../plugins/posts";
import { Leaderboard } from "../types/post";
import { AntDesign } from "@expo/vector-icons";
import { N } from "../types/navigation";

function LeaderboardItem({
  item,
  index,
  onPress,
}: {
  item: Leaderboard;
  index: number;
  onPress: () => void;
}) {
  let backgroundColor = "white";
  switch (index + 1) {
    case 1:
      backgroundColor = "#DB7F7F";
      break;
    case 2:
      backgroundColor = "#E5ABAB";
      break;
    case 3:
      backgroundColor = "#E5D2D2";
      break;
  }
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          backgroundColor,
          marginBottom: 20,
          borderRadius: 10,
          alignItems: "center",
          paddingHorizontal: 25,
        }}
      >
        <Text style={{ fontFamily: "Athiti_700Bold", fontSize: 25 }}>
          {index + 1}
        </Text>

        <Text
          style={{
            fontFamily: "Athiti_400Regular",
            padding: 20,
            fontWeight: "bold",
            flexGrow: 1,
            fontSize: 18,
          }}
        >
          {item.title}
        </Text>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Text
            style={{
              fontFamily: "Athiti_700Bold",
              fontSize: 20,
              paddingRight: 5,
            }}
          >
            {item.likes}
          </Text>
          <AntDesign name={"like1"} size={24} color="black" />
        </View>
      </View>
    </Pressable>
  );
}
export default function LeaderboardScreen({ navigation }: N<"Leaderboard">) {
  const { data, isLoading, isValidating, mutate } = useLeaderboard();
  return (
    <View style={{ backgroundColor: "#F3E9E9", height: "100%" }}>
      <FlatList
        style={{ padding: 18, paddingBottom: 20 }}
        data={data}
        renderItem={({ item, index }) => (
          <LeaderboardItem
            item={item}
            index={index}
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
    </View>
  );

  const styles = StyleSheet.create({});
}
