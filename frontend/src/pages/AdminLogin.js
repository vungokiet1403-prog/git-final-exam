import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Vui lòng nhập đầy đủ tài khoản và mật khẩu!");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { username, password },
        { withCredentials: true } // QUAN TRỌNG khi dùng session
      );

      alert("Đăng nhập thành công!");
      navigate("/admin/dashboard"); // chỉnh lại đúng route của bạn

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Sai tài khoản hoặc mật khẩu!");
      } else {
        alert("Không thể kết nối đến server!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
  <div className="admin-login-box">
    <h2>Đăng nhập Admin</h2>

    <input
      type="text"
      placeholder="Tài khoản"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />

    <input
      type="password"
      placeholder="Mật khẩu"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button onClick={handleLogin}>
      Đăng nhập
    </button>

  </div>
</div>
  );
}

export default AdminLogin;