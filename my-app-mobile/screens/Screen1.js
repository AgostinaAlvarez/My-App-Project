import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";

export default function Screen1() {
  const bottomSheetRef = useRef(null);
  const snapPoints = ["60%", "90%"];

  const [indexRef, setIndexRef] = useState(1);

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={1}
        onChange={(index) => {
          if (index !== 2) {
            Keyboard.dismiss();
          }
        }}
        enablePanDownToClose={true}
        onClose={() => {
          setIsBottomSheetOpen(false);
        }}
      >
        <BottomSheetView>
          <View style={styles.content}>
            <TextInput
              placeholder="escribe algo"
              onFocus={() => {
                bottomSheetRef.current?.expand();
              }}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  content: {
    width: "100%",
    height: 70,
    backgroundColor: "red",
  },
});
