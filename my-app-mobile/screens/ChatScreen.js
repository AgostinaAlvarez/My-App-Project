import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { AppContext } from "../context/AppContext";
import { v4 as uuidv4 } from "uuid";

// Datos de ejemplo
const ChatScreen = () => {
  const { selectedUser, friends, setFriends } = useContext(AppContext);

  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(selectedUser.messages);

  const sendMessage = () => {
    if (message.trim()) {
      const date = new Date();
      console.log(date.toLocaleTimeString());

      const newMessage = {
        id: String(chatMessages.length + 1),
        text: message,
        sender: "me",
        time: new Date().toLocaleTimeString().slice(0, -3),
      };

      const updateData = friends.map((item) => {
        if (item.username === selectedUser.username) {
          return {
            ...item,
            last_message: newMessage,
            messages: [newMessage, ...item.messages],
          };
        }
        return item;
      });

      setFriends(updateData);

      setChatMessages([newMessage, ...chatMessages]);
      setMessage("");
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "me" ? styles.messageSent : styles.messageReceived,
      ]}
    >
      {item.sender !== "me" && (
        <Image
          //source={{ uri: "https://placeimg.com/100/100/people" }} // Foto de perfil de la persona
          style={styles.avatar}
        />
      )}
      <View style={styles.messageBubble}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <FlatList
          data={chatMessages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatContainer}
          inverted
        />
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
    elevation: 1, // Sombra para iOS
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  chatContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  messageSent: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  messageReceived: {
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "red",
  },
  messageBubble: {
    maxWidth: "80%",
    backgroundColor: "#0078fe",
    padding: 10,
    borderRadius: 10,
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  messageTime: {
    color: "#ddd",
    fontSize: 12,
    marginTop: 5,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingBottom: 30,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#0078fe",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  contentContainer: {
    paddingBottom: 100, // Ajuste para dar espacio al teclado
  },
});

export default ChatScreen;
