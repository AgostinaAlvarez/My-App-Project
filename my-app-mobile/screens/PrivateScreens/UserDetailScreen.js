import { LinearGradient } from "expo-linear-gradient";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PostComponent from "../../components/PostComponent";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import CommentsComponent from "../../components/CommentsComponent";
import LikesComponent from "../../components/LikesComponent";
import { example_data } from "../../data/ExampleData";

const posts = [
  {
    id: 1,
    name: "Alex",
    lastname: "Turner",
    username: "@wanderlust_wanderer",
    likes: 15234,
    comments: 482,
    saves: 3120,
    content: "Sunsets and soul-searching.  What's your favorite way to unwind?",
  },
  {
    id: 2,
    name: "Alex",
    lastname: "Turner",
    username: "@wanderlust_wanderer",
    likes: 14299,
    comments: 322,
    saves: 322,
    content: "Another",
  },
];

export default function UserDetailScreen() {
  const navigation = useNavigation();

  const user_data = example_data.find((item) => item.id === 21);

  const posts_data = user_data.posts.map((post, index) => {
    return {
      _id: index,
      userId: user_data.id,
      name: user_data.name,
      lastname: user_data.lastname,
      username: user_data.username,
      avatar: user_data.avatar,
      likes: post.likes,
      comments: post.comments,
      saves: post.saves,
      content: post.content,
    };
  });

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isLikesOpen, setIsLikeOpen] = useState(false);

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
    <SafeAreaView style={styles.container}>
      {isCommentsOpen ? (
        <CommentsComponent setIsCommentsOpen={setIsCommentsOpen} />
      ) : (
        <></>
      )}
      {isLikesOpen ? <LikesComponent setIsLikeOpen={setIsLikeOpen} /> : <></>}

      <LinearGradient
        colors={[
          "#9795f0",
          //"#fbc8d4",
          "#ffffff",
          "#ffffff",
        ]}
        style={styles.background}
      />
      <FlatList
        data={posts_data}
        renderItem={({ item }) => (
          <PostComponent
            post={item}
            isAnotherUser={false}
            HandleLikesPress={HandleLikesPress}
            HandleCommentsPress={HandleCommentsPress}
          />
        )}
        keyExtractor={(item) => item._id.toString()}
        ListHeaderComponent={
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: user_data.avatar }} style={styles.avatar} />
            </View>
            <Text style={styles.name}>
              {user_data.name} {user_data.lastname}
            </Text>
            <Text style={styles.username}>{user_data.username}</Text>
            <Text style={styles.description}>{user_data.description}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>FOLLOW</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.messageButton}
                onPress={() => {
                  navigation.navigate("chat_screen");
                }}
              >
                <Text style={styles.messageButtonText}>MESSAGE</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 30, // Espacio adicional al final del ScrollView
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  username: {
    color: "#1d1d1d",
    fontSize: 16,
    marginTop: 6,
  },
  profession: {
    fontSize: 16,
    color: "#9E9E9E",
    marginTop: 6,
  },
  description: {
    fontSize: 14,
    color: "#2e2e2e",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 25,
    marginBottom: 40, // Espacio para separar los botones del contenido adicional
    gap: 10,
  },
  followButton: {
    backgroundColor: "#7b79e7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    borderRadius: 30,
    height: 35,
  },
  followButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  messageButton: {
    borderColor: "#7b79e7",
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    borderRadius: 30,
    height: 35,
  },
  messageButtonText: {
    color: "#7b79e7",
    fontSize: 13,
    fontWeight: "bold",
  },
  feedContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  feedHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D85757",
    marginBottom: 10,
    textAlign: "center",
  },
  feedItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
});
