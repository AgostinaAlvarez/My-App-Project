import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AppContext } from "../context/AppContext";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";

export default function AuthScreen() {
  const [haveAcount, setHaveAcount] = useState(true);

  /*
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const password = watch("password");

  const changeScreen = (value) => {
    reset();
    setHaveAcount(value);
  };

  // Función para manejar el envío del formulario
  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    haveAcount === true ? loginUser(data) : signUpUser(data);
  };

  const signUpUser = async (data) => {
    console.log(data);

    try {
      const response = await axios.post(
        "http://10.161.182.104:8000/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("respuesta del back");
      console.log(response);
      setToken(response.data.token);
      setUserData(response.data.user);
      setAuthToken(response.data.token);

      setLogged(true);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (data) => {
    try {
      const response = await axios.post(
        "http://10.161.182.104:8000/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("respuesta del back");
      console.log(response.data);
      setToken(response.data.token);
      setUserData(response.data.user);
      setAuthToken(response.data.token);
      setLogged(true);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const setToken = async (token) => {
    console.log("guardando token...");
    await SecureStore.setItemAsync("authToken", token);
  };
  */

  return (
    <>
      {haveAcount ? (
        <LoginScreen setHaveAcount={setHaveAcount} />
      ) : (
        <SignUpScreen setHaveAcount={setHaveAcount} />
      )}
    </>
  );
}
