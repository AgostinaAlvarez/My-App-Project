// components/ChatHeader.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

const UserHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      {/* Aquí se puede colocar una imagen de perfil */}
      <TouchableOpacity
        style={{
          padding: 20,
          backgroundColor: "violet",
        }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text>{`<`}</Text>
      </TouchableOpacity>

      <Text style={styles.contactName}>Nombre del usuario</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
    paddingTop: 65,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 5,
    backgroundColor: "red",
    marginLeft: 15,
  },
  contactName: {
    fontSize: 17,
    fontWeight: "600",
  },
});

export default UserHeader;
