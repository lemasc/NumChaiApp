import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Add: undefined;
  View: { postId: string };
  Edit: { postId: string };
  Leaderboard: undefined;
};

export type N<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;
