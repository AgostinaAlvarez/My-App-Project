import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import axios from "axios";
import { AppContext } from "./context/AppContext";

function App() {
  const {
    setLogged,
    setUserData,
    setAuthToken,
    setUnreadMessagesCount,
    setConversations,
    setPosts,
    setFriendshipRequestRecibed,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      denyAccess();
      return;
    }
    verifyToken(token);
  }, []);

  const denyAccess = () => {
    setLogged(false);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const allowAccess = () => {
    setLogged(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const verifyToken = async (token) => {
    try {
      const response = await axios.get("http://localhost:8000/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setAuthToken(token);
      setUserData(response.data.user);
      const unread_messages_count = localStorage.getItem(
        "unread_messages_count"
      );
      setUnreadMessagesCount(JSON.parse(unread_messages_count));
      //conversaciones
      const conversations = localStorage.getItem("conversations");
      setConversations(JSON.parse(conversations));

      //posts:
      const posts = localStorage.getItem("posts");
      setPosts(JSON.parse(posts));

      //recibed friendship requqests
      const friendship_requests_recibed = localStorage.getItem(
        "friendship_requests_recibed"
      );
      setFriendshipRequestRecibed(JSON.parse(friendship_requests_recibed));

      allowAccess();
    } catch (err) {
      console.log(err);
      localStorage.clear();
      denyAccess();
    }
  };

  return <>{loading ? <div>Cargando</div> : <AppRouter />}</>;
}

export default App;
