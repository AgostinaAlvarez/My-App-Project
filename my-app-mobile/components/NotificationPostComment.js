import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function NotificationPostComment() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.img}></View>
      <Text>
        A <Text style={{ fontWeight: 600 }}>username</Text> ha comentado tu
        post.
        <Text style={{ color: "grey" }}> 1 d</Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: "#93939351",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: "50%",
    backgroundColor: "pink",
  },
});
