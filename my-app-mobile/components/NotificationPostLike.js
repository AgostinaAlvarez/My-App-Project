import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function NotificationPostLike() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.img}></View>
      <Text style={{ width: "80%" }}>
        A <Text style={{ fontWeight: 600 }}>username_something_des</Text>,{" "}
        <Text style={{ fontWeight: 600 }}>user_desf</Text> ,{" "}
        <Text style={{ fontWeight: 600 }}>djue_uops </Text>y otras personas les
        gusto tu post.<Text style={{ color: "grey" }}> 19 h</Text>
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
    gap: 10,
    alignItems: "center",
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: "50%",
    backgroundColor: "pink",
  },
});
