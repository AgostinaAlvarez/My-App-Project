import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SearchScreen() {
  const navigation = useNavigation();
  const list = [];
  const totalItems = 20;
  for (let i = 1; i <= totalItems; i++) {
    list.push({ id: i, name: `Item ${i}` }); // Crear y agregar el objeto al array
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          placeholder="Buscar usuario..."
          style={{
            backgroundColor: "#fff",
            width: "100%",
            height: 45,
            paddingLeft: 15,
            borderWidth: 1,
            borderColor: "#93939351",
            borderRadius: 30,
          }}
        />
      </View>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("user_screen");
              }}
              style={styles.userItemContainer}
            >
              <View style={styles.userInformation}>
                <View style={styles.img}></View>
                <View style={styles.userNameContainer}>
                  <Text style={{ fontWeight: 600 }}>Nombre Apellido</Text>
                  <Text>Mensaje del usuario</Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.scrollContainer}
        nestedScrollEnabled={true}
      />
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
    height: 70,
    //backgroundColor: "red",
    borderBottomColor: "#93939351",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  scrollContainer: {
    paddingBottom: 100, // Espacio extra al final del scroll
    gap: 10,
  },

  //USER ITEM

  userItemContainer: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 8,
    //borderBottomColor: "#93939351",
    //borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: "50%",
    backgroundColor: "pink",
  },
  userInformation: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    width: "87%",
  },
  userNameContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    gap: 3,
  },
});
