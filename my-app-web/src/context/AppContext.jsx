import { createContext, useState } from "react";
import { aside_options } from "../utils/AsideOptions";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [logged, setLogged] = useState(false);
  const [userData, setUserData] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  const [asideOptions, setAsideOptions] = useState(aside_options);

  //mensajes no leidos:
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(null);

  //conversaciones
  const [conversations, setConversations] = useState([]);

  //usuario seleccionado para mandarle un mensjae
  const [selectedUser, setSelectedUser] = useState(null);

  //posts del usuario loggeado
  const [posts, setPosts] = useState(null);
  /*
    Estructura de los posts
    {
      currentPage: 1,
      posts: [{...}],
      totalPages: 1,
      totalPosts: 1
    }
  */

  //solicitudes de amistad recibidas
  const [friendshipRequestRecibed, setFriendshipRequestRecibed] = useState([]);

  return (
    <AppContext.Provider
      value={{
        logged,
        setLogged,
        userData,
        setUserData,
        authToken,
        setAuthToken,
        asideOptions,
        setAsideOptions,
        unreadMessagesCount,
        setUnreadMessagesCount,
        conversations,
        setConversations,
        selectedUser,
        setSelectedUser,
        posts,
        setPosts,
        friendshipRequestRecibed,
        setFriendshipRequestRecibed,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
