import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import UserIconAside from "../components/PrivateComponents/UserIconAside";
import { Button, Drawer } from "antd";
import { Avatar, Badge } from "antd";
import { GoHomeFill } from "react-icons/go";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import io from "socket.io-client";
import { notification } from "antd";
import logo from "../assets/logo-black.png";
import "../styles/principalStructure.css";
import SearchScreen from "../components/PrivateComponents/SearchScreen";
import NotificationsAsideComponent from "../components/PrivateComponents/NotificationsAsideComponent";

export const socket = io("http://localhost:8000");

const PrivateStructure = ({ children }) => {
  const { setLogged, userData, unreadMessagesCount } = useContext(AppContext);

  const { setConversations } = useContext(AppContext);

  const { setFriendshipRequestRecibed, setUserData } = useContext(AppContext);

  const [searchUser, setSearchUser] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const userId = userData?.userId; // Aquí puedes obtenerlo desde tu estado o cookies

    socket.emit("authenticate", userId);

    socket.on("privateMessage", (data) => {
      HandleNewMessage(data);
    });

    socket.on("friendRequest", (data) => {
      HandleFriendRequest(data);
    });

    socket.on("acceptedFriendshipRequest", (data) => {
      HandleAcceptFriendshiptRequest(data);
    });

    return () => {
      socket.off("privateMessage");
    };
  }, []);

  //mesaje privado
  const HandleNewMessage = (data) => {
    const conversationCreated = data.conversationCreated;
    if (conversationCreated === true) {
      //es una nueva conversacion
    } else {
      const chats = JSON.parse(localStorage.getItem("conversations"));
      const updateChats = chats.map((item) => {
        if (item._id === data.conversation._id) {
          return {
            ...item,
            messages: [...item.messages, data.newMessage],
            lastMessage: data.newMessage,
          };
        }
      });
      localStorage.setItem("conversations", JSON.stringify(updateChats));
      setConversations(updateChats);
      //openNotificationWithIcon();
      //console.log(data);
      const sender_full_name = `${data.newMessage.sender.name} ${data.newMessage.sender.lastname}`;
      openMessageNotification(data.newMessage.content, sender_full_name);
    }
  };

  //solicitud de amistad
  const HandleFriendRequest = (data) => {
    console.log("me llego una solicitud de amistad, DATA:");
    console.log(data);
    //Esta parte es para manejar las solicitudes de amistad

    const newRequest = data;
    const friendship_requests_recibed = JSON.parse(
      localStorage.getItem("friendship_requests_recibed")
    );

    const update_requests = [...friendship_requests_recibed, newRequest];

    localStorage.setItem(
      "friendship_requests_recibed",
      JSON.stringify(update_requests)
    );

    setFriendshipRequestRecibed(update_requests);

    //aca abre la noticacion
    const sender_full_name = `${data.sender.name} ${data.sender.lastname}`;
    openFriendRequestNotification(sender_full_name);
  };

  const HandleAcceptFriendshiptRequest = (data) => {
    console.log("me llego una solicitud de amistad aceptada");
    console.log(data);

    setUserData({
      ...userData,
      friends: userData.friends + 1,
    });

    const user_full_name = `${data.accepter.name} ${data.accepter.lastname}`;
    openFriendRequestNotificationAccepted(user_full_name);
  };

  //ABRIR NOTIFICACION

  const openMessageNotification = (content, sender) => {
    api.open({
      icon: <div className="notification-profile-img"></div>,
      message: sender,
      description: content,
    });
  };

  const openFriendRequestNotification = (sender) => {
    api.open({
      icon: <div className="notification-profile-img"></div>,
      message: sender,
      description: "Te ha enviado una solicitud de amistad",
    });
  };

  const openFriendRequestNotificationAccepted = (sender) => {
    api.open({
      icon: <div className="notification-profile-img"></div>,
      message: sender,
      description: "Ha aceptado tu solicitud de amistad",
    });
  };

  const openNotificationWithIcon = () =>
    //notification_type, content
    api.open({
      icon: <div>Ic</div>,
      message: "nuevo mensaje",
      description: "contenido del mensaje",
    });
  {
    /*
    if (notification_type === "message") {
      api.open({
        icon: <div>Ic</div>,
        message: content.sender_fullname,
        description: content.message_content,
      });
    } else if (notification_type === "other") {
      api.open({
        //icon: <div>Ic</div>,
        message: "Notificacion",
        description: "contenido",
      });
    }
    */
  }

  const navigate = useNavigate();

  const HandleSelectOption = (route) => {
    navigate(`${route}`);
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const showNotifications = () => {
    setSearchUser(false);
    setOpen(true);
  };

  const showUserSearch = () => {
    setSearchUser(true);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setTimeout(() => {
      setSearchUser(false);
    }, 100);
  };

  return (
    <div className="private-structure">
      {contextHolder}
      <aside className="private-structure-aside">
        <img src={logo} style={{ width: "160px" }} />
        <div
          className="aside-option"
          onClick={() => {
            HandleSelectOption("/");
          }}
        >
          <Badge>
            <Avatar shape="square">
              <GoHomeFill />
            </Avatar>
          </Badge>
          <span>Home</span>
        </div>
        <div className="aside-option" onClick={showUserSearch}>
          <Badge>
            <Avatar shape="square">
              <FaSearch />
            </Avatar>
          </Badge>
          <span>Busqueda</span>
        </div>
        <div
          className="aside-option"
          onClick={() => {
            HandleSelectOption("/messages");
          }}
        >
          <Badge count={unreadMessagesCount}>
            <Avatar shape="square">
              <BiSolidMessageSquareDots />
            </Avatar>
          </Badge>
          <span>Mensajes</span>
        </div>
        <div className="aside-option" onClick={showNotifications}>
          <Badge count={100}>
            <Avatar shape="square">
              <IoNotifications />
            </Avatar>
          </Badge>
          <span>Notificacionesss</span>
        </div>
        {/*
          <Button onClick={openNotificationWithIcon}>Abrir noti</Button>
          */}
      </aside>
      <main>{children}</main>

      <Drawer
        title={searchUser ? "Buscar usuario" : "Notificaciones"}
        onClose={onClose}
        open={open}
        placement={"left"}
      >
        {searchUser ? (
          <>
            <SearchScreen onClose={onClose} />
          </>
        ) : (
          <>
            <NotificationsAsideComponent />
          </>
        )}
      </Drawer>
    </div>
  );
};

export default PrivateStructure;
