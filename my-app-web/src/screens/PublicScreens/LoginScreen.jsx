import { Button, Input } from "antd";
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { userExampleData } from "../../utils/Data";
import { AppContext } from "../../context/AppContext";
import { Controller, useForm } from "react-hook-form";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "../../styles/authStyles.css";
import logo from "../../assets/logo.png";
import logoBlack from "../../assets/logo-color.png";

const LoginScreen = () => {
  const {
    setUserData,
    setLogged,
    setAuthToken,
    setUnreadMessagesCount,
    setConversations,
    setPosts,
    setFriendshipRequestRecibed,
  } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem("auth-token", response.data.token);

      setUserData(response.data.user);

      setAuthToken(response.data.token);
      //getPendingRequests(response.data.token);
      getConversationsData(response.data.token);
      getUnreadMessagesCount(response.data.token);
      getPosts(response.data.token);
      getAllFriendRequestRecibed(response.data.token);
      setLogged(true);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  //obtengo las conversaciones para renderizarlas
  const getConversationsData = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/conversations/get-all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("conversations", JSON.stringify(response.data));
      setConversations(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  //obtengo las solicitudes de seguimiento
  const getPendingRequests = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/friendship/get-all-friend-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem(
        "pending_requests",
        JSON.stringify(response.data.requests)
      );
    } catch (err) {
      console.log(err);
    }
  };

  //obtengo los mensajes que me han enviado cuando no estaba conectado
  const getUnreadMessagesCount = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/messages/get-unread-messages-count",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUnreadMessagesCount(response.data.unreadMessagesCount);
      localStorage.setItem(
        "unread_messages_count",
        response.data.unreadMessagesCount
      );
    } catch (err) {
      console.log(err);
    }
  };

  //obtener todos mis posts
  const getPosts = async (token) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/posts/get?page=1&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      const modifyDataPosts = {
        ...data,
        posts: data.posts.reverse(),
      };
      setPosts(modifyDataPosts);
      localStorage.setItem("posts", JSON.stringify(modifyDataPosts));
    } catch (err) {
      console.log(err);
    }
  };

  //obtener todas las solicitudes de amistad que me mandaron
  const getAllFriendRequestRecibed = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/friendship/get-all-friend-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("respuesta de las friendship rquests");
      console.log(response);
      localStorage.setItem(
        "friendship_requests_recibed",
        JSON.stringify(response.data.friendship_requests_recibed)
      );
      setFriendshipRequestRecibed(response.data.friendship_requests_recibed);
    } catch (error) {
      console.log("eror al obtner los datos de las solicitudes de amistad");
      console.log(error);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-bg-col auth-bg-col-left">
        <form onSubmit={handleSubmit(onSubmit)} className="auth-fom">
          <img style={{ width: "90%" }} src={logoBlack} className="logo-auth" />
          <img
            style={{ width: "100%" }}
            src={logo}
            className="logo-responsive"
          />
          <div className="auth-form-field-container">
            <span>Nombre de usuario</span>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: "El nombre de usuario es obligatorio" }}
              render={({ field }) => (
                <Input {...field} status={errors.username && "error"} />
              )}
            />
            {errors.username && (
              <span className="auth-error-label">
                *{errors.username.message}
              </span>
            )}
          </div>
          <div className="auth-form-field-container">
            <span>Contrasena</span>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "La contraseña es obligatoria",
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Contraseña"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  status={errors.password && "error"}
                />
              )}
            />
            {errors.password && (
              <span className="auth-error-label">
                *{errors.password.message}
              </span>
            )}
          </div>
          {error ? (
            <span className="auth-error-label">
              Usuario o contraseña incorrectos
            </span>
          ) : (
            <></>
          )}
          <Button
            className="auth-form-btn "
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Iniciar sesión
          </Button>
          <div>
            <span>No tienes cuenta ?</span>
            <NavLink to={"/signup"}>Registrarse</NavLink>
          </div>
        </form>
      </div>
      <div className="auth-bg-col auth-bg-col-right"></div>
    </div>
  );
};

export default LoginScreen;
