import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  Keyboard,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StyleSheet, Text, View } from "react-native";

export default function NewPostScreen() {
  const navigate = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigate.goBack();
          }}
        >
          <Text style={{ fontWeight: 500 }}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Postear</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.postNewContainer}>
        <View style={styles.img}></View>
        <TextInput
          placeholder="Escribe algo..."
          style={{ width: "80%" }}
          autoFocus
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#7b79e7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
    borderRadius: 30,
    height: 32,
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  postNewContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: "50%",
    backgroundColor: "pink",
  },
});
