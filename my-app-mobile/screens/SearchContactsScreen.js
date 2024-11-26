import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useContext, useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { users } from "../data/data";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const UserItem = ({ user }) => {
  const navigation = useNavigation();

  const { setSelectedUser, setSearchedUser } = useContext(AppContext);

  function selectUser() {
    console.log(user);
    setSearchedUser(user);
    navigation.navigate("user_detail");
    //setSelectedUser(user);
    //console.log(`seleccionar usuario ${user.username}`);
    //navigation.navigate("user_detail");
  }
  return (
    <TouchableOpacity
      //onPress={select_user}
      onPress={selectUser}
      style={styles.contactItem}
    >
      <Image style={styles.avatar} />
      <View style={styles.contactInfo}>
        <Text style={styles.user_name}>{user.username}</Text>
        <Text style={styles.name}>
          {user.name}
          {/*user.last_name*/}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function SearchContactsScreen() {
  const { authToken } = useContext(AppContext);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (query.trim() === "") {
      setUsers([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const searchUsers = async () => {
        try {
          const response = await axios.post(
            "http://10.161.182.104:8000/search",
            {
              query,
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          setUsers(response.data.users);
        } catch (error) {
          console.error("Error al buscar usuarios", error);
        }
      };

      searchUsers();
    }, 500); // Espera de 300ms

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <View style={styles.container}>
      {/*BUSQUEDA*/}
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={18} color="black" style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar usuario..."
          value={query} // Asociar el valor con el estado searchQuery
          onChangeText={(query) => setQuery(query)} // Llamar a handleSearch cuando el texto cambie
        />
        <Ionicons name="filter" size={20} color="black" style={styles.icon} />
      </View>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserItem user={item} />}
        //keyExtractor={(item) => item.id} // Llave única para cada contacto
        contentContainerStyle={styles.scrollContainer} // Contenedor del scroll
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "pink",
    paddingTop: 60,
  },

  searchContainer: {
    flexDirection: "row", // Coloca los elementos en fila
    alignItems: "center", // Centra verticalmente los elementos
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 7,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
  },
  searchInput: {
    height: 40,
    flex: 1, // Esto hace que el TextInput ocupe todo el espacio restante
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 0, // Elimina el borde
    marginLeft: 10,
    marginRight: 10,
  },
  icon: {
    color: "grey",
  },

  scrollContainer: {
    paddingBottom: 20, // Espacio extra al final del scroll
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    elevation: 1, // Sombra para dispositivos Android
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "red",
  },
  contactInfo: {
    flex: 1,
  },

  user_name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  name: {
    fontSize: 14,
    color: "#555",
  },
});
