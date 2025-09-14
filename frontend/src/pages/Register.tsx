import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
  const res = await axios.post('http://localhost:5001/api/users/register', { name, phone });
      navigate(`/dashboard/${(res.data as any)._id}`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow" style={{ maxWidth: 400, width: "100%" }}>
        <h2 className="mb-3 text-center">הרשמה</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="שם" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="טלפון" value={phone} onChange={e => setPhone(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">הרשם</button>
        </form>
        {error && <p className="text-danger mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default Register;
