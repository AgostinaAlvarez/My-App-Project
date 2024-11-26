import React, { useRef, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { TextInput } from "react-native-gesture-handler";
import CommentComponent from "./CommentComponent";
import LikeComponent from "./LikeComponent";
import { likes } from "../data/ExampleData";

export default function LikesComponent({ setIsLikeOpen }) {
  const bottomSheetRef = useRef(null);
  const snapPoints = ["70%"];

  // Lista ficticia de comentarios
  const list = [];
  for (let i = 1; i <= 20; i++) {
    list.push({ id: i, name: `Comentario ${i}` });
  }

  const renderItem = ({ item, index }) => {
    const isLastItem = index === likes.length - 1; // Verifica si es el último elemento

    if (isLastItem) {
      return (
        <>
          <LikeComponent like={item} />
          <Button title="Ver mas" />
        </>
      );
    }

    return <LikeComponent like={item} />;
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={1}
        onChange={(index) => {
          if (index < 1) {
            setIsLikeOpen(false);
          }
        }}
        enablePanDownToClose={true}
        onClose={() => {
          setIsLikeOpen(false);
        }}
      >
        <BottomSheetView>
          <View style={styles.bottomSheetViewContainer}>
            <View style={styles.header}>
              <Text>Me gustas</Text>
              <View style={styles.newCommentContainer}>
                <TextInput
                  placeholder="Buscar"
                  style={{
                    backgroundColor: "#fff",
                    width: "100%",
                    height: "90%",
                    paddingLeft: 15,
                    borderWidth: 1,
                    borderColor: "#93939351",
                    borderRadius: 30,
                  }}
                />
              </View>
            </View>
            <View style={styles.flatListContainer}>
              <FlatList
                data={likes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  bottomSheetViewContainer: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  header: {
    width: "100%",
    height: 80,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: "#93939351",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  newCommentContainer: {
    //backgroundColor: "blue",
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    marginTop: 7,
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: "50%",
    backgroundColor: "pink",
  },
  flatListContainer: {
    height: 455,
    //backgroundColor: "red",
  },

  //esto es del post

  bottomSheetContent: {
    flex: 1, // Asegura que el contenido ocupe todo el espacio del BottomSheet
  },
  listContainer: {
    paddingBottom: 20, // Espacio extra al final para que el último elemento sea visible
  },
  commentItem: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginVertical: 5,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  commentText: {
    fontSize: 16,
    color: "#333",
  },
});
