import React from "react";
import { useNavigate } from "react-router-dom";

const LoginSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow" style={{ maxWidth: 400, width: "100%" }}>
        <h2 className="mb-3 text-center">ברוך הבא!</h2>
        <p className="mb-4 text-center">בחר/י סוג כניסה:</p>
        <div className="d-flex justify-content-center gap-2">
          <button className="btn btn-primary" onClick={() => navigate("/admin-login")}>כניסה כמנהל</button>
          <button className="btn btn-secondary" onClick={() => navigate("/register")}>כניסה כמשתמש</button>
        </div>
      </div>
    </div>
  );
};

export default LoginSelection;
