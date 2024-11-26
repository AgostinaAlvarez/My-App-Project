import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PostComponent from "../../components/PostComponent";
import Ionicons from "@expo/vector-icons/Ionicons";
import LikesComponent from "../../components/LikesComponent";
import CommentsComponent from "../../components/CommentsComponent";
import { useNavigation } from "@react-navigation/native";
import { example_data } from "../../data/ExampleData";

export default function FeedScreen() {
  const navigation = useNavigation();

  const posts_data = example_data.map((item, index) => {
    return {
      _id: index,
      userId: item.id,
      name: item.name,
      lastname: item.lastname,
      username: item.username,
      avatar: item.avatar,
      likes: item.posts[0].likes,
      comments: item.posts[0].comments,
      saves: item.posts[0].saves,
      content: item.posts[0].content,
    };
  });

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isLikesOpen, setIsLikeOpen] = useState(false);
  //lista ficticia de posts
  const list = [];
  const totalItems = 10;
  for (let i = 1; i <= totalItems; i++) {
    list.push({ id: i, name: `Item ${i}` }); // Crear y agregar el objeto al array
  }

  const HandleLikesPress = () => {
    setIsLikeOpen(true);
  };

  const HandleCommentsPress = () => {
    setIsCommentsOpen(true);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {isCommentsOpen ? (
          <CommentsComponent setIsCommentsOpen={setIsCommentsOpen} />
        ) : (
          <></>
        )}
        {isLikesOpen ? <LikesComponent setIsLikeOpen={setIsLikeOpen} /> : <></>}

        <View style={styles.header}>
          <Image
            source={require("../../assets/logo-color.png")}
            style={styles.logo}
          />
          <View style={styles.headerIconContainer}>
            {/*Mensajes*/}
            <TouchableOpacity
              style={{ position: "relative" }}
              onPress={() => {
                navigation.navigate("notifications");
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  height: 13,
                  width: 13,
                  borderRadius: "50%",
                  backgroundColor: "red",
                  zIndex: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 10 }}>8</Text>
              </View>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#6a11cb"
              />
            </TouchableOpacity>
            {/*Notifications*/}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("messages_screen");
              }}
            >
              <Ionicons name="navigate-outline" size={24} color="#6a11cb" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterItemCta}>
            <Text style={{ color: "#6a11cb", fontWeight: 600 }}>Para ti</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterItem}>
            <Text style={{ color: "grey", fontWeight: 600 }}>Siguiendo</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.newPostIcon}
          onPress={() => {
            navigation.navigate("new_post");
          }}
        >
          <Ionicons name="add-sharp" size={30} color="white" />
        </TouchableOpacity>
        <FlatList
          data={posts_data}
          renderItem={({ item }) => (
            <PostComponent
              post={item}
              isAnotherUser={true}
              HandleLikesPress={HandleLikesPress}
              HandleCommentsPress={HandleCommentsPress}
            />
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.scrollContainer}
          nestedScrollEnabled={true}
        />
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  header: {
    width: "100%",
    height: 68,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    borderBottomColor: "#93939351",
    borderBottomWidth: 1,
  },

  filterItem: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderBottomColor: "transparent",
    borderBottomWidth: 3,
  },

  filterItemCta: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderBottomColor: "#6a11cb",
    borderBottomWidth: 3,
  },

  headerIconContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  logo: {
    height: 40,
    width: 100,
  },
  scrollContainer: {
    paddingBottom: 20, // Espacio extra al final del scroll
    gap: 10,
  },
  newPostIcon: {
    height: 50,
    width: 50,
    borderRadius: "50%",
    backgroundColor: "#6a11cb",
    position: "absolute",
    zIndex: 300,
    bottom: 13,
    right: 17,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
