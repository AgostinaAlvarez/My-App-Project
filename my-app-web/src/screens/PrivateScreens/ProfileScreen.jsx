import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "../../styles/profile.css";
import { Button, Input } from "antd";
import { BsThreeDots } from "react-icons/bs";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import { SlLike } from "react-icons/sl";
import { SlBubbles } from "react-icons/sl";
import { CiBookmark } from "react-icons/ci";
import NewPost from "../../components/PrivateComponents/NewPost";
import { List, Skeleton } from "antd";
import FriendsModal from "../../components/FriendsModal";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";

const ProfileScreen = () => {
  const { userData, posts, authToken } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [friends, setFriends] = useState(null);

  useEffect(() => {
    getFriendsData();
  }, []);

  const getFriendsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/friends/${userData.userId}/get-friends?limit=${limit}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setFriends(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const HandleOpenFriendModal = () => {
    setIsFriendsModalOpen(true);
  };

  return (
    <>
      <div className="profile-screen">
        {/*Header */}
        <div className="profile-screen-header">
          <div className="profile-screen-profile-image"></div>
        </div>
        {/*Informacion del usuario*/}
        <div className="profile-screen-info-container">
          <div className="profile-screen-info-box">
            <span className="profile-screen-info-box-name">
              {userData.name} {userData.lastname}
            </span>
            <span className="profile-screen-info-box-username">
              @{userData.username}
            </span>
            <p className="profile-screen-info-box-description">
              Hola! Esta es una descripcion estandar del usuario
            </p>
            <div className="profile-screen-info-box-data-container">
              <div
                className="profile-screen-info-box-data"
                onClick={HandleOpenFriendModal}
              >
                <span className="profile-screen-info-box-data-value">
                  {userData.friends}
                </span>
                <span className="profile-screen-info-box-data-label">
                  Seguidores
                </span>
              </div>
              <div className="profile-screen-info-box-data">
                <span className="profile-screen-info-box-data-value">20</span>
                <span className="profile-screen-info-box-data-label">
                  Posts
                </span>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
            }}
          >
            <Button>Editar perfil</Button>
          </div>
        </div>
        <NewPost user={userData} setLoading={setLoading} />

        <div
          style={{
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "0px 40px",
            paddingTop: "15px",
            paddingBottom: "70px",
          }}
        >
          {posts?.posts.map((item, index) => (
            <div className="profile-screen-post-container">
              {loading ? (
                <Skeleton loading={loading} active avatar>
                  <List.Item.Meta />
                </Skeleton>
              ) : (
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
                        <span>{item.likesCount} Me Gusta</span>
                      </div>
                      <div className="profile-screen-post-footer-action-box">
                        <SlBubbles />
                        <span>{item.totalComments} Comentarios</span>
                      </div>
                      <div className="profile-screen-post-footer-action-box">
                        <CiBookmark />
                        <span>{item.savedCount} Save</span>
                      </div>
                    </div>
                  </div>
                  {/*Agregar un nuevo Comentario*/}
                  <div className="profile-screen-post-coment-new">
                    <div className="profile-screen-post-coment-new-img"></div>
                    <TextArea
                      placeholder="Agregar un comentario"
                      style={{ width: "87%" }}
                    />
                    <Button>Comentar</Button>
                  </div>
                  {/*Comentarios*/}
                  <div className="profile-screen-post-comments-container">
                    {/*Comentario*/}
                    {item.comments.map((comment, index) => (
                      <div key={index} className="profile-screen-post-comment">
                        <div className="profile-screen-post-coment-new-img"></div>
                        <div>
                          <div className="profile-screen-post-comment-data">
                            <span style={{ color: "black" }}>
                              {comment.user.name} {comment.user.lastname}
                            </span>
                            <span>@{comment.user.username}</span>
                          </div>
                          <span>{comment.content}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {item.totalComments > 3 ? (
                    <span className="profile-screen-post-comment-more-coments-span">
                      Ver {item.totalComments - 3} comentarios mas
                    </span>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <FriendsModal
        isFriendsModalOpen={isFriendsModalOpen}
        setIsFriendsModalOpen={setIsFriendsModalOpen}
        friends={friends?.friends}
      />
    </>
  );
};

export default ProfileScreen;
