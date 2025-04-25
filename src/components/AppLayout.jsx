import React from "react";

const AppLayout = ({ children }) => {
  return (
    <div style={{
      backgroundColor: "#0e0e10",
      color: "#f5f5f5",
      minHeight: "100vh",
      fontFamily: "'Georgia', serif",
      padding: "1rem"
    }}>
      {children}
    </div>
  );
};

export default AppLayout;