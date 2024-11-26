import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import LoadingScreen from "../screens/LoadingScreen";
import AppRouter from "../router/AppRouter";
import AuthScreen from "../screens/AuthScreen";
import { auth_header } from "../utils/headers";
import { apiGet } from "../functions/api";
import { back_router, server_url } from "../utils/routes";

export default function Aplication() {
  const { setLogged, setUserData, setAuthToken } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyAccess();
  }, []);

  const verifyAccess = async () => {
    const token = await SecureStore.getItemAsync("auth-token");
    if (!token) {
      denyAccess();
      return;
    }
    verifyToken(token);
  };

  const verifyToken = async (token) => {
    const header = auth_header(token);

    const { data: response, error } = await apiGet(
      `${server_url}/${back_router.auth.path}/${back_router.auth.access_token}`,
      header
    );

    if (response) {
      //response.user
      //Seteo la informacion del usuario
      await SecureStore.setItemAsync("auth-token", token);
      setAuthToken(token);
      setUserData(response.user);
    } else {
      console.log("error");
      console.log(error);
    }

    /*
    try {
      const response = await axios.get("http://10.161.182.104:8000/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setAuthToken(token);
      setUserData(response.data.user);
      allowAccess(token);
    } catch (err) {
      console.log(err);
      denyAccess();
    }
    */
  };

  const allowAccess = async () => {
    setLogged(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const denyAccess = async () => {
    await SecureStore.deleteItemAsync("auth-token");
    setLogged(false);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  /*
  const { setLogged, setUserData, setAuthToken } = useContext(AppContext);


  useEffect(() => {
    getToken();
  }, []);

  // Obtener token
  const getToken = async () => {
    const token = await SecureStore.getItemAsync("authToken");
    console.log(token);
    if (!token) {
      //no hay token, asique voy a denegar acceso a las pantallas privadas
      denyAccess();
      return;
    }
    verifyToken(token);
  };

  const verifyToken = async (token) => {
    try {
      const response = await axios.get("http://10.161.182.104:8000/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setAuthToken(token);
      setUserData(response.data.user);
      allowAccess(token);
    } catch (err) {
      console.log(err);
      denyAccess();
    }
  };

  const allowAccess = async (token) => {
    await SecureStore.setItemAsync("authToken", token);
    setLogged(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const denyAccess = async () => {
    await SecureStore.deleteItemAsync("authToken");
    setLogged(false);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  */

  return <>{loading ? <LoadingScreen /> : <AppRouter />}</>;
}
