import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppContext } from "../context/AppContext";
import { socket } from "../router/PrivateRoutes/PrivateRoutes";
import axios from "axios";

const RenderRequestStatus = ({ existingFriendship, userId1, userId2 }) => {
  //userId1 = mi id
  //userId2 = el id del usuario
  return (
    <>
      {existingFriendship.status === "accepted" ? (
        <View style={styles.followButton}>
          <Text style={styles.followButtonText}>SIGUIENDO</Text>
        </View>
      ) : (
        <>
          {existingFriendship?.userId1 === userId1 ? (
            <View style={styles.followButton}>
              <Text style={styles.followButtonText}>PENDIENTE</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>ACEPTAR</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </>
  );
};

export default function UserScreen() {
  const { searchedUser, userData, authToken } = useContext(AppContext);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [error, setError] = useState(false);

  const [thisUserData, setThisUserData] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const user_id = searchedUser["_id"];
      const response = await axios.get(
        `http://10.161.182.104:8000/user/getbyid/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("DATA DEL USUARIO");
      console.log(response.data);
      setThisUserData(response.data);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoadingScreen(false);
    }
  };

  const sendFriendRequest = async () => {
    /*
    - userId1 es el emisor (que soy yo)
    - userId2 es el receptor
    */
    const userId1 = userData.userId;
    const userId2 = thisUserData?.user["_id"];
    const data = {
      toUserId: userId2, //usuario al que le voy a mandar la solicitud
      senderData: {
        //mis datos, ya que soy el sender
        username: userData.username,
        name: userData.name,
        lastname: userData.lastname,
        userId: userId1,
      },
    };
    console.log("esta es la data");
    console.log(data);
    /*
    mandar la notificacion
    ejecutar la peticion http
    actualizar el estado de existingFriendship que va a quedar asi:
    {
      userId1,
      userId2,
    }
    */

    console.log("haciendo peticion");

    try {
      const response = await axios.post(
        "http://10.161.182.104:8000/friendship/new",
        { userId1, userId2 },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("respuesta del back");
      console.log(response);
      console.log("enviando socket");
      socket.emit("sendFriendRequest", data);

      setThisUserData({
        ...thisUserData,
        existingFriendship: {
          userId1,
          userId2,
          status: "pending",
        },
      });
    } catch (err) {
      console.log("error al enviar la solicitud");
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      {loadingScreen ? (
        <>
          <>
            <Text>Loading...</Text>
          </>
        </>
      ) : (
        <>
          {error ? (
            <>
              <Text>Error</Text>
            </>
          ) : (
            <>
              {/* Fondo degradado */}
              <LinearGradient
                colors={["#ff9a9e", "#fff6f3", "#ffffff"]}
                style={styles.background}
              />

              <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Foto de perfil */}
                <View style={styles.avatarContainer}>
                  <Image
                    source={{ uri: "https://placeimg.com/100/100/people" }}
                    style={styles.avatar}
                  />
                </View>

                {/* Nombre y descripción */}
                <Text style={styles.name}>
                  {`${thisUserData?.user.name} ${thisUserData?.user.lastname}`}
                </Text>
                <Text style={styles.profession}>
                  @{thisUserData?.user.username}
                </Text>
                <Text style={styles.description}>
                  {/*Hi, my name is Carol and I love photography! It's my greatest passion in life.*/}
                  {`${thisUserData?.user.description} descr`}
                </Text>

                {/* Botones */}
                <View style={styles.buttonContainer}>
                  {thisUserData?.existingFriendship === null ||
                  thisUserData?.existingFriendship.status === "rejected" ? (
                    <TouchableOpacity
                      style={styles.followButton}
                      onPress={sendFriendRequest}
                    >
                      <Text style={styles.followButtonText}>FOLLOW</Text>
                    </TouchableOpacity>
                  ) : (
                    <RenderRequestStatus
                      existingFriendship={thisUserData?.existingFriendship}
                      userId1={userData.userId}
                      userId2={thisUserData?.user["_id"]}
                    />
                  )}
                  <TouchableOpacity style={styles.messageButton}>
                    <Text style={styles.messageButtonText}>MESSAGE</Text>
                  </TouchableOpacity>
                </View>

                {/* Aquí puedes agregar más contenido como el feed */}
                {/*
          <View style={styles.feedContainer}>
            <Text style={styles.feedHeader}>My Feed</Text>
            <View style={styles.feedItem}>
              <Text>Post #1: A photo I took yesterday!</Text>
            </View>
            <View style={styles.feedItem}>
              <Text>Post #2: Another shot from my latest trip!</Text>
            </View>
          </View>
            */}
              </ScrollView>
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollContainer: {
    alignItems: "center",
    paddingTop: 70,
    paddingBottom: 30, // Espacio adicional al final del ScrollView
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#D85757",
    marginTop: 10,
  },
  profession: {
    fontSize: 16,
    color: "#9E9E9E",
    marginTop: 6,
  },
  description: {
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 25,
    marginBottom: 30, // Espacio para separar los botones del contenido adicional
  },
  followButton: {
    backgroundColor: "#D85757",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginRight: 10,
  },
  followButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  messageButton: {
    borderColor: "#D85757",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  messageButtonText: {
    color: "#D85757",
    fontSize: 16,
    fontWeight: "bold",
  },
  feedContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  feedHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D85757",
    marginBottom: 10,
    textAlign: "center",
  },
  feedItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
});

/*
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppContext } from "../context/AppContext";

export default function UserScreen() {
  const { setChatScreen } = useContext(AppContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Detalle del usuario...</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Chat_screen");
          setChatScreen(false);
        }}
        style={{
          padding: 20,
          backgroundColor: "violet",
        }}
      >
        <Text>Enviar mensaje</Text>
      </TouchableOpacity>
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
*/
