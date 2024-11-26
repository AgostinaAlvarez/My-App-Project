import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { TapGestureHandler } from "react-native-gesture-handler";
import { useState } from "react";
import { transform_number } from "../functions/functions";

export default function PostComponent({
  post,
  isAnotherUser,
  HandleLikesPress,
  HandleLike,
  HandleCommentsPress,
  HandleSavePress,
}) {
  const navigation = useNavigation();
  const [likeOn, setLikeOn] = useState(false);
  const detectDoublePress = () => {
    setLikeOn(true);
    setTimeout(() => {
      setLikeOn(false);
    }, 2000);
  };

  return (
    <TapGestureHandler
      numberOfTaps={2} // Detecta un doble toque
      onActivated={detectDoublePress}
    >
      <View style={styles.container}>
        {/*Imagen*/}
        {/*
          <TouchableOpacity
            style={styles.img}
            onPress={() => {
              navigation.navigate("user_screen");
            }}
          ></TouchableOpacity>
          */}
        <Image
          source={{
            uri: post.avatar,
          }}
          style={styles.img}
          resizeMode="cover"
        />
        {/*contenido*/}
        <View style={styles.content}>
          {/*header*/}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                if (isAnotherUser === true) {
                  navigation.navigate("user_screen");
                }
              }}
            >
              <Text style={{ fontWeight: 500 }}>
                {post.name} {post.lastname}
              </Text>
              <Text style={{ color: "#303030" }}>{post.username}</Text>
            </TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={16} color="#6a11cb" />
          </View>
          <Text style={{ color: "#303030" }}>{post.content}</Text>
          <View style={styles.footer}>
            {/*Likes */}
            <View style={styles.footerIcon}>
              <TouchableOpacity onPress={detectDoublePress}>
                {likeOn ? (
                  <Ionicons name="heart-sharp" size={30} color="red" />
                ) : (
                  <Ionicons name="heart-outline" size={23} color="#6a11cb" />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={HandleLikesPress}>
                <Text
                  style={{ fontSize: 15, color: likeOn ? "red" : "#6a11cb" }}
                >
                  {transform_number(post.likes)}
                </Text>
              </TouchableOpacity>
            </View>
            {/*comments*/}
            <TouchableOpacity onPress={HandleCommentsPress}>
              <View style={styles.footerIcon}>
                <Ionicons name="chatbubble-outline" size={21} color="#6a11cb" />
                <Text style={{ fontSize: 15, color: "#6a11cb" }}>
                  {transform_number(post.comments)}
                </Text>
              </View>
            </TouchableOpacity>
            {/*saves */}
            <TouchableOpacity>
              <View style={styles.footerIcon}>
                <Ionicons name="bookmark-outline" size={22} color="#6a11cb" />
                <Text style={{ fontSize: 15, color: "#6a11cb" }}>
                  {transform_number(post.saves)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TapGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    borderBottomColor: "#93939351",
    borderBottomWidth: 1,
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: "50%",
  },
  content: {
    width: "85%",
    display: "flex",
    flexDirection: "column",
    gap: 7,
  },
  header: {
    width: "100%",
    //backgroundColor: "blue",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    //justifyContent: "space-between",
    marginTop: 7,
  },
  footerIcon: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    height: 30,
    alignItems: "center",
    //backgroundColor: "red",
  },
});
