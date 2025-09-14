import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin") {
      navigate("/admin");
    } else {
      setError("סיסמה שגויה");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>כניסה למנהל</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="הכנס סיסמה"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" style={{ marginLeft: "10px" }}>כניסה</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AdminLogin;
