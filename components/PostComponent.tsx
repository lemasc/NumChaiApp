import { Text, View, Pressable, StyleSheet } from "react-native";
import dayjs from "../plugins/dayjs";
import { Post, Document } from "../types/post";

export default function PostComponent({
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
            fontFamily: "Athiti_700Bold", // Use the Athiti_700Bold font
          }}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontFamily: "Athiti_400Regular",
            fontSize: 16,
            color: "gray",
            paddingVertical: 5,
          }}
        >
          สร้างเมื่อ {dayjs(item.created).format("LLL น.")}
        </Text>
        <Text
          numberOfLines={2}
          style={{ fontFamily: "Athiti_400Regular", fontSize: 16 }}
        >
          {item.content}
        </Text>
      </View>
    </Pressable>
  );
}
