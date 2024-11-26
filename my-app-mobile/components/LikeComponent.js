import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function LikeComponent({ like }) {
  const navigation = useNavigation();

  return (
    <View style={styles.likeContainer}>
      <TouchableOpacity
        style={styles.likeUserInformation}
        onPress={() => {
          navigation.navigate("user_screen");
        }}
      >
        <View style={styles.img}></View>
        <View style={styles.likeUserNameContainer}>
          <Text style={{ fontWeight: 600, fontSize: 13 }}>
            {like.name} {like.lastname}
          </Text>
          <Text style={{ fontSize: 12 }}>{like.username}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Seguir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 50,
    width: 50,
    borderRadius: "50%",
    backgroundColor: "pink",
  },
  likeContainer: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    //paddingHorizontal: 15,
    //borderBottomColor: "#93939351",
    //borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  likeUserInformation: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  likeUserNameContainer: {
    display: "flex",
    flexDirection: "column",
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#7b79e7",
    paddingHorizontal: 30,
    paddingVertical: 6,
    borderRadius: 5,
  },
});
