import { StyleSheet, Text, View } from "react-native";
import { AppContextProvider } from "./context/AppContext";
import Aplication from "./aplication/Aplication";
import FeedScreen from "./screens/FeedScreen.js";
import { Navigation } from "./Navigation.js";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthScreen from "./screens/AuthScreen.js";

export default function App() {
  return (
    <>
      <GestureHandlerRootView>
        <AppContextProvider>
          <Navigation />
        </AppContextProvider>
      </GestureHandlerRootView>
    </>
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
