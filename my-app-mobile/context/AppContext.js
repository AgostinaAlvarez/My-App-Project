import { createContext, useState } from "react";
import { friends_data } from "../data/data";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [logged, setLogged] = useState(false);
  const [userData, setUserData] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  return (
    <AppContext.Provider
      value={{
        logged,
        setLogged,
        userData,
        setUserData,
        authToken,
        setAuthToken,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
