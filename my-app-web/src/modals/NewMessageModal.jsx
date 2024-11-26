/*
import { Button, Modal } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const NewMessageModal = ({
  openNewMessageModal,
  setOpenNewMessageModal,
  getChatMessages,
}) => {
  const { setSelectedUser, authToken } = useContext(AppContext);

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [userSelect, setUserSelect] = useState(null);

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

  const handleOk = async () => {
    //acciones
    getChatMessages(userSelect._id);
    setSelectedUser(userSelect);
    handleCancelModal();
  };

  const handleCancelModal = () => {
    setQuery("");
    setUsers([]);
    setUserSelect(null);
    setOpenNewMessageModal(false);
  };

  return (
    <Modal
      title="Nuevo mensaje"
      open={openNewMessageModal}
      onOk={handleOk}
      onCancel={handleCancelModal}
      footer={[
        <Button
          key="submit"
          type="primary"
          //loading={loadingModalDelete}
          onClick={handleOk}
        >
          Aceptar
        </Button>,
        <Button key="back" onClick={handleCancelModal}>
          Cancelar
        </Button>,
      ]}
    >
      <div>
        <div>Para:</div>
        {userSelect ? <div>Seleccionado : {userSelect?.name} </div> : <></>}
        <input
          type="text"
          placeholder="Buscar usuarios"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div>
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => {
                setUserSelect(user);
                setQuery("");
                setUsers([]);
              }}
            >
              {user.username} - {user.name}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default NewMessageModal;

*/

import React from "react";

const NewMessageModal = () => {
  return (
    <div>
      <div>Mensajes</div>
    </div>
  );
};

export default NewMessageModal;
