import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function BottomSheetComponent({
  setIsBottomSheetOpen,
  children,
}) {
  const bottomSheetRef = useRef(null);
  const snapPoints = ["60%", "90%"];

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={1}
        enablePanDownToClose={true}
        onClose={() => {
          setIsBottomSheetOpen(false);
        }}
      >
        <BottomSheetView>{children}</BottomSheetView>
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
});
