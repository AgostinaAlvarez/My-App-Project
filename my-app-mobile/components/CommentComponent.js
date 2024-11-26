import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function CommentComponent({ comment }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.postContainer}
      onPress={() => {
        navigation.navigate("user_screen");
      }}
    >
      <Image
        style={styles.img}
        source={{
          uri: comment.avatar,
        }}
      />
      <View style={styles.postContent}>
        <View style={styles.postHeader}>
          <Text
            style={{
              fontWeight: 600,
            }}
          >
            {comment.name} {comment.lastname}
          </Text>
          <Text
            style={{
              fontSize: 12,
            }}
          >
            {comment.username}
          </Text>
        </View>
        <Text>{comment.comment}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 40,
    width: 40,
    borderRadius: "50%",
    backgroundColor: "pink",
  },
  postContainer: {
    width: "100%",
    padding: 15,
    paddingLeft: 15,
    paddingRight: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    borderBottomColor: "#93939351",
    borderBottomWidth: 1,
  },
  postContent: {
    width: "85%",
    display: "flex",
    flexDirection: "column",
    gap: 7,
  },
  postHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
});
