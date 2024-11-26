import { Button } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

const NotificationsAsideComponent = () => {
  const { friendshipRequestRecibed, setFriendshipRequestRecibed, authToken } =
    useContext(AppContext);
  const [principalInbox, setPrincipalInbox] = useState(true);

  const HandleRejectFriendshiprRequest = async (id) => {
    try {
      await axios.put(
        "http://localhost:8000/friendship/handleStatus",
        { friendshipId: id, status: "rejected" },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const friendship_requests_recibed = JSON.parse(
        localStorage.getItem("friendship_requests_recibed")
      );

      const update_requests = friendship_requests_recibed.filter(
        (item) => item._id !== id
      );

      localStorage.setItem(
        "friendship_requests_recibed",
        JSON.stringify(update_requests)
      );

      setFriendshipRequestRecibed(update_requests);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ width: "100%", display: "flex" }}>
        <Button
          onClick={() => {
            setPrincipalInbox(true);
          }}
        >
          Princial
        </Button>
        <Button
          onClick={() => {
            setPrincipalInbox(false);
          }}
        >
          Solicitudes de amistad
        </Button>
      </div>
      {principalInbox ? (
        <>
          <div>Bandeja de notificaciones principal</div>
        </>
      ) : (
        <>
          <div>Solo las notificaciones</div>
          {friendshipRequestRecibed.map((request) => (
            <div
              style={{
                width: "100%",
                boxSizing: "border-box",
                border: "1px solid black",
              }}
            >
              <span>Img</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <span>
                  {request.sender.name} {request.sender.lastname}
                </span>
                <span>{request.sender.usrname}</span>
              </div>
              <div style={{ width: "100%", display: "flex" }}>
                <Button>Confirmar</Button>
                <Button
                  onClick={() => {
                    HandleRejectFriendshiprRequest(request._id);
                  }}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

{
  /*
  
  <div>Solicitudes de amistad</div>
            <div>
              <span>Img</span>
              <span>@username ha solicitado seguirte</span>
            </div>
            <div>
              <span>Img</span>
              <span>@username le ha gustado tu post</span>
              <span>//img</span>
            </div>
            <div>
              <span>Img</span>
              <span>@username ha comentado tu post</span>
              <span>//aca deberia agregarle un preview del post</span>
            </div>
  
  */
}

export default NotificationsAsideComponent;
