import React from "react";

const UserIconAside = () => {
  const user_avatar = null;
  return (
    <>
      {user_avatar ? (
        <img src={user_avatar} className="aside-user-avatar" />
      ) : (
        <div className="aside-user-icon"></div>
      )}
    </>
  );
};

export default UserIconAside;
