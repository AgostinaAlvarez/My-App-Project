import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import AuthScreen from "../screens/AuthScreen";

export default function AppRouter() {
  const { logged } = useContext(AppContext);
  return <>{logged ? <PrivateRoutes /> : <AuthScreen />}</>;
}
