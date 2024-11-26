import { Button, Modal } from "antd";
import axios from "axios";
import React, { useEffect } from "react";

const FriendsModal = ({
  isFriendsModalOpen,
  setIsFriendsModalOpen,
  friends,
}) => {
  const HandleCancelModal = () => {
    setIsFriendsModalOpen(false);
  };

  return (
    <Modal
      title="Seguidores"
      open={isFriendsModalOpen}
      onCancel={HandleCancelModal}
      footer={null}
    >
      <div>
        <div>Lista de usuarios:</div>
        {friends ? (
          <>
            {friends.map((item, index) => (
              <div key={index}>
                <span>
                  {item.name} {item.lastname}
                </span>
                <span>@{item.username}</span>
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
        <Button>Ver Mas</Button>
      </div>
    </Modal>
  );
};

export default FriendsModal;
