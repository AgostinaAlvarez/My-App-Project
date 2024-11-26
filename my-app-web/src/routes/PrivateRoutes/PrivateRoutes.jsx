import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateStructure from "../../structures/PrivateStructure";
import HomeScreen from "../../screens/PrivateScreens/HomeScreen";
import SearchScreen from "../../components/PrivateComponents/SearchScreen";
import MessagesScreen from "../../screens/PrivateScreens/MessagesScreen";
import ProfileScreen from "../../screens/PrivateScreens/ProfileScreen";
import UserScreen from "../../screens/PrivateScreens/UserScreen";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateStructure>
            <HomeScreen />
          </PrivateStructure>
        }
      />
      <Route
        path="/messages"
        element={
          <PrivateStructure>
            <MessagesScreen />
          </PrivateStructure>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateStructure>
            <ProfileScreen />
          </PrivateStructure>
        }
      />
      <Route
        path="/user/:id"
        element={
          <PrivateStructure>
            <UserScreen />
          </PrivateStructure>
        }
      />
      <Route path="/login" element={<Navigate to="/" />} />
      <Route path="/signup" element={<Navigate to="/" />} />
      <Route path="/*" element={<div>Nor found</div>} />
    </Routes>
  );
};

export default PrivateRoutes;
