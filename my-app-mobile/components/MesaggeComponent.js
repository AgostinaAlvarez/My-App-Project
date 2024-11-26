import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function MesaggeComponent() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("chat_screen");
      }}
    >
      <View style={styles.userInformation}>
        <View style={styles.img}></View>
        <View style={styles.userNameContainer}>
          <Text style={{ fontWeight: 600 }}>Nombre Apellido</Text>
          <Text>Mensaje del usuario</Text>
        </View>
      </View>
      <Text>15:16</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 50,
    width: 50,
    borderRadius: "50%",
    backgroundColor: "pink",
  },
  container: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    //paddingHorizontal: 15,
    borderBottomColor: "#93939351",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    //alignItems: "center",
  },
  userInformation: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    width: "87%",
  },
  userNameContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    gap: 3,
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#7b79e7",
    paddingHorizontal: 30,
    paddingVertical: 6,
    borderRadius: 5,
  },
});
