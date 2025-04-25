import React from "react";
import { Link } from "react-router-dom";

const RitualsPortal = () => (
  <div style={{
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#0e0e10",
    color: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "2rem"
  }}>
    <h1>The Rituals Await</h1>
    <Link to="/ghost" style={linkStyle}>👻 GhostMeMeter</Link>
    <Link to="/saveorsink" style={linkStyle}>💧 SaveOrSink</Link>
  </div>
);

const linkStyle = {
  margin: "1rem",
  padding: "1.25rem 2rem",
  fontSize: "1.2rem",
  border: "1px solid white",
  borderRadius: "12px",
  textDecoration: "none",
  color: "white",
  background: "transparent"
};

export default RitualsPortal;