import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { updateAsideOptions } from "../../functions/AsideFuncions";
import PrincipalLayout from "../../structures/PrincipalLayout";
import "../../styles/homeScreen.css";
import "../../styles/profile.css";
import { Avatar, Button, Tooltip } from "antd";
import { socket } from "../../structures/PrivateStructure";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";

import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { SlLike } from "react-icons/sl";
import { SlBubbles } from "react-icons/sl";
import { CiBookmark } from "react-icons/ci";
import NewPost from "../../components/PrivateComponents/NewPost";

const HomeScreen = () => {
  const { setAsideOptions, userData, setLogged } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const updateOptions = updateAsideOptions(1);
    setAsideOptions(updateOptions);
  }, []);

  const testDta = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1];

  return (
    <>
      <div className="home-scren-content-container">
        <div className="home-screen-feed-content">
          <NewPost user={userData} setLoading={setLoading} />
          <div className="home-screen-feed ">
            {/*
            testDta.map((item, index) => (
              <div className="profile-screen-post-container">
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
                  contenido del post
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
              </div>
            ))
            */}
          </div>
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
    </>
  );
};

export default HomeScreen;
