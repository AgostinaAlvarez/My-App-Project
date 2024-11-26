import React, { useRef, useState } from "react";
import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { TextInput } from "react-native-gesture-handler";
import CommentComponent from "./CommentComponent";
import { comments } from "../data/ExampleData";

export default function CommentsComponent({ setIsCommentsOpen }) {
  const bottomSheetRef = useRef(null);
  const snapPoints = ["70%"];

  // Lista ficticia de comentarios
  const list = [];
  for (let i = 1; i <= 3; i++) {
    list.push({ id: i, name: `Comentario ${i}` });
  }

  const renderItem = ({ item, index }) => {
    // Verifica si es el último elemento
    const isLastItem = index === comments.length - 1;

    if (isLastItem) {
      return (
        <>
          <CommentComponent comment={item} />
          <Button title="Ver mas comentarios" />
        </>
      );
    }

    return <CommentComponent comment={item} />;
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={1}
        onChange={(index) => {
          if (index < 1) {
            setIsCommentsOpen(false);
          }
        }}
        enablePanDownToClose={true}
        onClose={() => {
          setIsCommentsOpen(false);
        }}
      >
        <BottomSheetView>
          <View style={styles.bottomSheetViewContainer}>
            <View style={styles.header}>
              <Text style={{ fontWeight: 500 }}>Comentarios</Text>
              <View style={styles.newCommentContainer}>
                <Image
                  style={styles.img}
                  source={{
                    uri: "https://i.pinimg.com/originals/76/37/1b/76371b2a2b1f40d8973c49047adda0da.jpg",
                  }}
                />
                <TextInput
                  placeholder="Escribe un comentario..."
                  style={{
                    backgroundColor: "#fff",
                    width: "87%",
                    height: "78%",
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
                data={comments}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
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
    height: 42,
    width: 42,
    borderRadius: "50%",
    borderWidth: 2,
    borderColor: "grey",
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
