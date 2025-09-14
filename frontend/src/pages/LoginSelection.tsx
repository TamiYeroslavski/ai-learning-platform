import React from "react";
import { useNavigate } from "react-router-dom";

const LoginSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>ברוך הבא!</h2>
      <p>בחר/י סוג כניסה:</p>
      <button onClick={() => navigate("/admin-login")}>כניסה כמנהל</button>
      <button onClick={() => navigate("/register")} style={{ marginLeft: "10px" }}>כניסה כמשתמש</button>
    </div>
  );
};

export default LoginSelection;
