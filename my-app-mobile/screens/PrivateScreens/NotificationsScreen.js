import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import NotificationPostComment from "../../components/NotificationPostComment";
import NotificationPostLike from "../../components/NotificationPostLike";
import NotificationPostFollow from "../../components/NotificationPostFollow";
import { useNavigation } from "@react-navigation/native";

export default function NotificationsScreen() {
  const navigation = useNavigation();

  const list = [];
  const totalItems = 15;
  for (let i = 1; i <= totalItems; i++) {
    list.push({ id: i, name: `Item ${i}` }); // Crear y agregar el objeto al array
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="chevron-back-outline" size={22} color="#6a11cb" />
        <Text style={{ fontSize: 19, fontWeight: 600, color: "#6a11cb" }}>
          Notificaciones
        </Text>
      </TouchableOpacity>
      <View
        style={{
          width: "100%",
          padding: 10,
          paddingVertical: 7,
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <TouchableOpacity style={styles.btnCta}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: "#fff" }}>Solicitudes de seguimiento</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <>
            {item.id % 2 === 0 ? (
              <NotificationPostLike />
            ) : (
              <>
                {item.id % 3 === 0 ? (
                  <NotificationPostFollow />
                ) : (
                  <NotificationPostComment />
                )}
              </>
            )}
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
    padding: 15,
    display: "flex",
    flexDirection: "row",
    gap: 3,
    //backgroundColor: "red",
    alignItems: "center",
  },
  scrollContainer: {
    paddingBottom: 100, // Espacio extra al final del scroll
    gap: 10,
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#a3a2ff9a",
    paddingVertical: 7,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  btnCta: {
    alignItems: "center",
    backgroundColor: "#7b79e7",
    paddingVertical: 7,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
});
