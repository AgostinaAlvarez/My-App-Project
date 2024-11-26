import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { updateAsideOptions } from "../../functions/AsideFuncions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchScreen = ({ onClose }) => {
  const navigate = useNavigate();

  const { authToken } = useContext(AppContext);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (query.trim() === "") {
      setUsers([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const searchUsers = async () => {
        try {
          const response = await axios.post(
            "http://localhost:8000/search",
            {
              query,
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          setUsers(response.data.users);
        } catch (error) {
          console.error("Error al buscar usuarios", error);
        }
      };

      searchUsers();
    }, 300); // Espera de 300ms

    // Limpiar el temporizador si el query cambia antes de que termine el tiempo
    return () => clearTimeout(timeoutId);
  }, [query]);

  const HandleSelectUser = (user) => {
    navigate(`/user/${user._id}`);
    onClose();
  };

  return (
    <>
      <div>Busqueda de otros usuarios</div>
      <div>
        <input
          type="text"
          placeholder="Buscar usuarios"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ul
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            boxSizing: "border-box",
          }}
        >
          {users.map((user) => (
            <li
              onClick={() => {
                HandleSelectUser(user);
              }}
              key={user._id}
              style={{
                width: "100%",
                backgroundColor: "red",
                boxSizing: "border-box",
                padding: "20px",
                cursor: "pointer",
              }}
            >
              {user.username} - {user.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SearchScreen;
