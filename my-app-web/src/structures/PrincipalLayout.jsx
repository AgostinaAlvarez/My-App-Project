import React from "react";
import "../styles/principalLayout.css";

const PrincipalLayout = ({ children }) => {
  return (
    <div className="main-content-container">
      <div>{children}</div>
      <aside>
        <div>Profile</div>
      </aside>
    </div>
  );
};

export default PrincipalLayout;
