import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { Avatar, Button, List, Tooltip } from "antd";
import { Skeleton } from "antd";
import { BsThreeDots } from "react-icons/bs";
import { SlBubbles, SlLike } from "react-icons/sl";
import { CiBookmark } from "react-icons/ci";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import FriendsModal from "../../components/FriendsModal";
import { socket } from "../../structures/PrivateStructure";

const UserScreen = () => {
  const { authToken, setUserData, userData, setLogged } =
    useContext(AppContext);
  const { setFriendshipRequestRecibed } = useContext(AppContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [loadingPost, setLoadingPost] = useState(true);
  const [error, setError] = useState(null);
  const items = Array(3).fill(null);
  const params = useParams();

  const [selectedUserData, setSelectedUserData] = useState(null);
  const [selectedUserPosts, setSelectedUserPosts] = useState(null);

  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);

  //limite de publicaciones y limite de pagina
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [selectedUserfriends, setSelectedUserFriends] = useState(null);

  const HandleOpenFriendModal = () => {
    setIsFriendsModalOpen(true);
  };

  useEffect(() => {
    getUserData(params.id);
    getUserPosts(params.id);
  }, []);

  const getUserData = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/user/getbyid/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSelectedUserData(response.data);
      getFriendsData(response.data.user.userId);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const getFriendsData = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/friends/${userId}/get-friends?limit=${limit}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSelectedUserFriends(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserPosts = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/posts/get_by_user_id?userId=${userId}&page=1&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      const modifyDataPosts = {
        ...data,
        posts: data.posts.reverse(),
      };
      setSelectedUserPosts(modifyDataPosts);
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoadingPost(false);
      }, 3000);
    }
  };

  const HandleSendFrienshipRequest = async () => {
    const data = {
      receiverId: selectedUserData?.user.userId,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/friendship/new",
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const friendship_request = response.data.friend_request;
      console.log("friend request:");
      console.log(friendship_request);
      const updateSelectedUserData = {
        ...selectedUserData,
        existingFriendship: friendship_request,
      };
      setSelectedUserData(updateSelectedUserData);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  const HanldeAcceptFriendshipRequest = async (id) => {
    try {
      await axios.put(
        "http://localhost:8000/friendship/handleStatus",
        { friendshipId: id, status: "accepted" },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const friendship_requests_recibed = JSON.parse(
        localStorage.getItem("friendship_requests_recibed")
      );

      const update_requests = friendship_requests_recibed.filter(
        (item) => item._id !== id
      );

      localStorage.setItem(
        "friendship_requests_recibed",
        JSON.stringify(update_requests)
      );

      setFriendshipRequestRecibed(update_requests);

      const updateSelectedUserData = {
        ...selectedUserData,
        existingFriendship: {
          ...selectedUserData.existingFriendship,
          status: "accepted",
        },
      };

      setSelectedUserData(updateSelectedUserData);

      //setear mi informacion:
      setUserData({
        ...userData,
        friends: userData.friends + 1,
      });
    } catch (err) {
      console.log("error al aceptar solicitud de amistad");
      console.log(err);
    }
  };

  const HandleRejectFriendshipRequest = async (id) => {
    //Si la reechazo no voy a mandar nada
    try {
      await axios.put(
        "http://localhost:8000/friendship/handleStatus",
        { friendshipId: id, status: "rejected" },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const friendship_requests_recibed = JSON.parse(
        localStorage.getItem("friendship_requests_recibed")
      );

      const update_requests = friendship_requests_recibed.filter(
        (item) => item._id !== id
      );

      localStorage.setItem(
        "friendship_requests_recibed",
        JSON.stringify(update_requests)
      );

      setFriendshipRequestRecibed(update_requests);

      const updateSelectedUserData = {
        ...selectedUserData,
        existingFriendship: {
          ...selectedUserData.existingFriendship,
          status: "rejected",
        },
      };

      setSelectedUserData(updateSelectedUserData);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleUnfollowUser = async () => {
    const userId = selectedUserData.user.userId;

    try {
      const response = await axios.post(
        "http://localhost:8000/friends/unfolow",
        { unfollowId: userId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const updateSelectedUserData = {
        ...selectedUserData,
        existingFriendship: null,
      };
      setUserData({
        ...userData,
        friends: userData.friends - 1,
      });
      setSelectedUserData(updateSelectedUserData);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleRenderRequqestStatus = (existingFriendship) => {
    //userId1 es el que la mando
    if (existingFriendship.userId1 === userData.userId) {
      //yo soy el que la mande
      if (existingFriendship.status === "pending") {
        return <Button>Pendiente</Button>;
      } else if (existingFriendship.status === "accepted") {
        return (
          <Button
            onClick={() => {
              HandleUnfollowUser();
            }}
          >
            Dejar de seguir
          </Button>
        );
      }
    } else {
      //el que la mando es otro
      if (existingFriendship.status === "pending") {
        return (
          <>
            <Button
              onClick={() => {
                HanldeAcceptFriendshipRequest(existingFriendship._id);
              }}
            >
              Aceptar solicitud
            </Button>
            <Button
              onClick={() => {
                HandleRejectFriendshipRequest(existingFriendship._id);
              }}
            >
              Rechazar solicitud
            </Button>
          </>
        );
      } else if (existingFriendship.status === "accepted") {
        return (
          <Button
            onClick={() => {
              HandleUnfollowUser();
            }}
          >
            Dejar de seguir
          </Button>
        );
      }
    }
  };

  return (
    <>
      <div className="home-scren-content-container">
        <div className="profile-screen">
          {/*Header */}
          <div className="profile-screen-header">
            <div className="profile-screen-profile-image"></div>
          </div>
          {/*Informacion del usuario*/}
          <div className="profile-screen-info-container">
            {loading ? (
              <div style={{ width: "100%", paddingTop: "40px" }}>
                <Skeleton active />
              </div>
            ) : (
              <div className="profile-screen-info-box">
                <span className="profile-screen-info-box-name">
                  {selectedUserData?.user.name}{" "}
                  {selectedUserData?.user.lastname}
                </span>
                <span className="profile-screen-info-box-username">
                  @{selectedUserData?.user.username}
                </span>
                <p className="profile-screen-info-box-description">
                  descripcion
                </p>
                <div className="profile-screen-info-box-data-container">
                  <div
                    className="profile-screen-info-box-data"
                    onClick={HandleOpenFriendModal}
                  >
                    <span className="profile-screen-info-box-data-value">
                      {selectedUserData?.user.friends}
                    </span>
                    <span className="profile-screen-info-box-data-label">
                      Seguidores
                    </span>
                  </div>
                  <div className="profile-screen-info-box-data">
                    <span className="profile-screen-info-box-data-value">
                      20
                    </span>
                    <span className="profile-screen-info-box-data-label">
                      Posts
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: 10,
              }}
            >
              {loading ? (
                <></>
              ) : (
                <>
                  {selectedUserData?.existingFriendship === null ||
                  selectedUserData?.existingFriendship.status === "rejected" ? (
                    <Button onClick={HandleSendFrienshipRequest}>Seguir</Button>
                  ) : (
                    <>
                      {HandleRenderRequqestStatus(
                        selectedUserData?.existingFriendship
                      )}
                    </>
                  )}
                  <Button>Mensaje</Button>
                </>
              )}
            </div>
          </div>
          <div
            style={{
              boxSizing: "border-box",
              padding: "10px 30px",
              paddingTop: "20px",
            }}
          >
            Publicaciones
          </div>
          {loadingPost ? (
            <>
              {items.map((_, index) => (
                <div className="profile-screen-feed-container">
                  <div className="profile-screen-post-container">
                    <Skeleton active avatar>
                      <List.Item.Meta />
                    </Skeleton>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {selectedUserPosts?.posts.map((item) => (
                <div className="profile-screen-feed-container">
                  <div className="profile-screen-post-container">
                    <>
                      <div className="profile-screen-post-header">
                        <div className="profile-screen-post-header-user-data">
                          <div className="profile-screen-post-header-user-data-img"></div>
                          <div className="profile-screen-post-header-user-data-username-container">
                            <span>Nombre del usuario</span>
                            <span style={{ fontSize: "13px" }}>@Username</span>
                          </div>
                        </div>
                        <BsThreeDots />
                      </div>
                      <p
                        style={{ margin: "24px 0px" }}
                        className="profile-screen-post-content"
                      >
                        {item.content}
                      </p>
                      <div className="profile-screen-post-footer">
                        <div>
                          <Avatar.Group
                            max={{
                              count: 3,
                              style: {
                                color: "#f56a00",
                                backgroundColor: "#fde3cf",
                              },
                            }}
                          >
                            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                            <a href="https://ant.design">
                              <Avatar
                                style={{
                                  backgroundColor: "#f56a00",
                                }}
                              >
                                K
                              </Avatar>
                            </a>
                            <Tooltip title="Ant User" placement="top">
                              <Avatar
                                style={{
                                  backgroundColor: "#87d068",
                                }}
                                icon={<UserOutlined />}
                              />
                            </Tooltip>
                            <Avatar
                              style={{
                                backgroundColor: "#1677ff",
                              }}
                              icon={<AntDesignOutlined />}
                            />
                          </Avatar.Group>
                        </div>
                        <div className="profile-screen-post-footer-actions-container">
                          <div className="profile-screen-post-footer-action-box">
                            <SlLike />
                            <span>Me Gusta</span>
                          </div>
                          <div className="profile-screen-post-footer-action-box">
                            <SlBubbles />
                            <span>Comentarios</span>
                          </div>
                          <div className="profile-screen-post-footer-action-box">
                            <CiBookmark />
                            <span>Save</span>
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <aside className="home-screen-profile-aside">
          <div
            className="home-screen-profile-aside-info-container"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <div className="home-screen-profile-aside-profile-img"></div>
            <span className="home-screen-profile-aside-profile-name">
              {userData.name} {userData.lastname}
            </span>
            <span className="home-screen-profile-aside-profile-username">
              @{userData.username}
            </span>
            <div className="home-screen-profile-aside-profile-data-container">
              <div className="home-screen-profile-aside-profile-data-box">
                <span className="home-screen-profile-aside-profile-data-value">
                  {userData.friends}
                </span>
                <span className="home-screen-profile-aside-profile-data-label">
                  Seguidores
                </span>
              </div>
              <div className="home-screen-profile-aside-profile-data-box">
                <span className="home-screen-profile-aside-profile-data-value">
                  45
                </span>
                <span className="home-screen-profile-aside-profile-data-label">
                  Posts
                </span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => {
              localStorage.clear();
              socket.emit("removeUserConnection", {
                userId: userData.userId,
                socketId: socket.id,
              });
              setLogged(false);
            }}
          >
            Cerrar sesion
          </Button>
        </aside>
      </div>

      <FriendsModal
        isFriendsModalOpen={isFriendsModalOpen}
        setIsFriendsModalOpen={setIsFriendsModalOpen}
        friends={selectedUserfriends?.friends}
      />
    </>
  );
};

export default UserScreen;
