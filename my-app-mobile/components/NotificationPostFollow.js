import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function NotificationPostFollow() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.information}>
        <TouchableOpacity
          style={styles.img}
          onPress={() => {
            navigation.navigate("user_screen");
          }}
        ></TouchableOpacity>
        <Text style={{ width: "75%" }}>
          <Text style={{ fontWeight: 600 }}>username_de_un_no </Text>
          ha solicitado seguirte
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: "#fff", fontWeight: 600, fontSize: 12 }}>
            Confirmar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: "#fff", fontWeight: 600, fontSize: 12 }}>
            Eliminar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: "50%",
    backgroundColor: "pink",
  },
  information: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    width: "55%",
    //backgroundColor: "red",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#7b79e7",
    padding: 5,
    borderRadius: 5,
  },
});
