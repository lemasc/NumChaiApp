import { usePost } from "../plugins/posts";
import { N } from "../types/navigation";
import AddScreen from "./AddScreen";

export default function EditScreen(props: N<"Edit">) {
  const { postId } = props.route.params ?? {};
  const { data } = usePost(postId ?? null);
  if (!data) {
    return null;
  }
  return <AddScreen {...props} post={data} />;
}
