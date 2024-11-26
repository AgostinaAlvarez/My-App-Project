import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
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
import { AppContext } from "../context/AppContext";

// Ejemplo de datos de contactos
const contacts = [
  {
    id: "1",
    name: "Juan Perez",
    phone: "las message",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    id: "2",
    name: "Maria Lopez",
    phone: "last",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    id: "3",
    name: "Carlos Sánchez",
    phone: "last",
    avatar: "https://placeimg.com/100/100/people",
  },
  {
    id: "4",
    name: "Ana Gómez",
    phone: "last",
    avatar: "https://placeimg.com/100/100/people",
  },
  // Más contactos...
];

const ContactItem = ({ user }) => {
  const { setSelectedUser, setChatScreen } = useContext(AppContext);

  const navigation = useNavigation();

  const press = () => {
    setChatScreen(true);
    setSelectedUser(user);
    navigation.navigate("Chat_screen");
  };

  const renderLastMessage = (message) => {
    if (message === null) {
      return <Text>Iniciar una conversacion</Text>;
    } else {
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {message.sender === "me" ? (
            <Ionicons name="checkmark-done" size={17} color="black" />
          ) : (
            <></>
          )}
          <Text>{message.text}</Text>
        </View>
      );
    }
  };

  const renderTimeLastMessage = (message) => {
    if (message === null) {
      return <></>;
    } else {
      return <Text style={{ fontSize: 11 }}>{message.time}</Text>;
    }
  };

  return (
    <TouchableOpacity onPress={press} style={styles.contactItem}>
      <Image style={styles.avatar} />
      <View style={styles.contactInfo}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.name}>{user.name}</Text>
          {renderTimeLastMessage(user.last_message)}
        </View>
        {renderLastMessage(user.last_message)}
      </View>
    </TouchableOpacity>
  );
};

const ContactList = () => {
  const { friends } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
  const navigation = useNavigation();

  const { setChatScreen } = useContext(AppContext);

  // Filtrar contactos basados en la búsqueda
  const filteredContacts = friends.filter((contact) =>
    contact.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* BUSQUEDA */}
      <View style={styles.searchContainer}>
        {/* Ícono de izquierda */}
        <AntDesign name="search1" size={18} color="black" style={styles.icon} />

        {/* Campo de texto para buscar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar contacto..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)} // Actualiza el estado con el texto de búsqueda
        />

        {/* Ícono de derecha */}
        <Ionicons name="filter" size={20} color="black" style={styles.icon} />
      </View>

      <FlatList
        data={filteredContacts} // Usa la lista filtrada
        renderItem={({ item }) => <ContactItem user={item} />}
        keyExtractor={(item) => item.id} // Llave única para cada contacto
        contentContainerStyle={styles.scrollContainer} // Contenedor del scroll
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "pink",
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
  iconRight: {
    marginLeft: 10, // Espacio entre el campo de texto y el ícono
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
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  phone: {
    fontSize: 14,
    color: "#555",
  },
});

export default ContactList;
