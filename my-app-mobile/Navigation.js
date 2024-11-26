import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeedScreen from "./screens/PrivateScreens/FeedScreen";
import SearchScreen from "./screens/PrivateScreens/SearchScreen";
import ProfileScreen from "./screens/PrivateScreens/ProfileScreen";
import NotificationsScreen from "./screens/PrivateScreens/NotificationsScreen";
import NewPostScreen from "./screens/PrivateScreens/NewPostScreen";
import MessagesScreen from "./screens/PrivateScreens/MessagesScreen";
import UserDetailScreen from "./screens/PrivateScreens/UserDetailScreen";
import ChatScreen from "./screens/PrivateScreens/ChatScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, View } from "react-native";

const Stack = createStackNavigator();
const TabBottomStack = createBottomTabNavigator();

function HomeScreenStack() {
  return (
    <Stack.Navigator initialRouteName="feed_screen">
      <Stack.Screen
        name="feed_screen"
        component={FeedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="notifications"
        component={NotificationsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="new_post"
        component={NewPostScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="messages_screen"
        component={MessagesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="chat_screen"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="user_screen"
        component={UserDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function SearchScreenStack() {
  return (
    <Stack.Navigator initialRouteName="search_screen">
      <Stack.Screen
        name="search_screen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="user_screen"
        component={UserDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="chat_screen"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function ProfileScreenStack() {
  return (
    <Stack.Navigator initialRouteName="profile_screen">
      <Stack.Screen
        name="profile_screen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="new_post"
        component={NewPostScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AppStakck() {
  return (
    <TabBottomStack.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#6a11cb",
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 10,
        },
      }}
    >
      <TabBottomStack.Screen
        name="Feed"
        component={HomeScreenStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
          //tabBarBadge: 10,
        }}
      />
      <TabBottomStack.Screen
        name="Search"
        component={SearchScreenStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={24} color={color} />
          ),
        }}
      />
      <TabBottomStack.Screen
        name="Profile"
        component={ProfileScreenStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={{
                uri: "https://i.pinimg.com/originals/76/37/1b/76371b2a2b1f40d8973c49047adda0da.jpg",
              }}
              style={{
                height: 34,
                width: 34,
                borderRadius: "50%",
                borderWidth: 2,
                borderColor: color,
              }}
              resizeMode="cover"
            />
          ),
        }}
      />
    </TabBottomStack.Navigator>
  );
}

export function Navigation() {
  return (
    <NavigationContainer>
      <AppStakck />
    </NavigationContainer>
  );
}
