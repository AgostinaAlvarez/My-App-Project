import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Button } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const MyComponent = () => {
  useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notificación recibida:", notification);
      }
    );

    return () => {
      notificationListener.remove();
    };
  }, []);
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permiso de notificación no concedido");
      } else {
        console.log("Permiso de notificación concedido");
      }
    };
    requestPermissions();
  }, []);

  const scheduleNotification = async () => {
    console.log("notificacion");
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Hola!",
        body: "Esta es una notificación local.",
      },
      trigger: { seconds: 5 },
    });
  };

  return (
    <View style={styles.container}>
      <Text>Screen 1</Text>
      <Button title="Programar Notificación" onPress={scheduleNotification} />
      <StatusBar style="auto" />
    </View>
  );
};
export default MyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
