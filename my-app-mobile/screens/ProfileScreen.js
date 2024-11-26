import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../context/AppContext";
import * as SecureStore from "expo-secure-store";
import { socket } from "../router/PrivateRoutes/PrivateRoutes";

export default function ProfileScreen() {
  const { userData, setUserData, setLogged, setAuthToken } =
    useContext(AppContext);

  const signOut = async () => {
    console.log(socket.id);

    await SecureStore.deleteItemAsync("authToken");
    setAuthToken(null);
    socket.emit("removeUserConnection", {
      userId: userData.userId,
      socketId: socket.id,
    });
    setLogged(false);
    setUserData(null);
  };

  return (
    <View style={styles.container}>
      <Text>Profile screen {userData?.name}</Text>
      <Button
        title="cerrar sesion"
        onPress={() => {
          signOut();
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
