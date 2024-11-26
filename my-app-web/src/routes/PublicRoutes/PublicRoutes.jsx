import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginScreen from "../../screens/PublicScreens/LoginScreen";
import SignUpScreen from "../../screens/PublicScreens/SignUpScreen";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/" element={<Navigate to={"/login"} />} />
      <Route path="/*" element={<Navigate to={"/login"} />} />
    </Routes>
  );
};

export default PublicRoutes;
