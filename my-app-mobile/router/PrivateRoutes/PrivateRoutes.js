import { View, Text } from "react-native";
import * as Notifications from "expo-notifications";
import React, { useContext, useEffect } from "react";
import { Navigation } from "../../Navigation";
import { AppContext } from "../../context/AppContext";
import io from "socket.io-client";

export const socket = io("http://10.161.182.104:8000"); // Replace with your server address

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function PrivateRoutes() {
  const { userData } = useContext(AppContext);

  //Notificaciones
  const scheduleNotification = async () => {
    console.log("notificacion");
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Hola!",
        body: "Esta es una notificación local.",
      },
      trigger: { seconds: 1 },
    });
  };

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

  //fin de notificaciones

  useEffect(() => {
    console.log(`Usuario: ${userData.userId} ${userData?.name}`);

    // Supón que tienes un método para obtener el `userId` del usuario logueado
    const userId = userData.userId; // Aquí puedes obtenerlo desde tu estado o cookies

    console.log("socket emit");
    // Enviamos el `userId` al servidor para asociar la conexión
    socket.emit("authenticate", userId);

    // Escuchamos los mensajes privados
    socket.on("privateMessage", (message) => {
      console.log("Mensaje privado recibido:", message);
      scheduleNotification();
      //llamar a la funcion de notificacion
    });

    socket.on("friendRequestNotification", (notification) => {
      console.log("Recibi una solicitud de amistad de:", notification);
      scheduleNotification();
    });

    // Cleanup on component unmount (desmontaje del componente)
    return () => {
      socket.off("privateMessage");
    };
  }, []);

  return <Navigation />;
}
