import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
          const location = useLocation();
        if(location.pathname.startsWith("/admin")){
          return null;
        }
  return (
    <nav className="navbar">
      <h2 className="logo">Bắp Homestay</h2>

      <div className="nav-links">
        <Link to="/">Trang chủ</Link>
        <Link to="/food">Đồ ăn</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/noi-quy">Xem nội quy</Link>
        <Link to="/lien-he">Liên hệ</Link>

        <Link to="/admin-login" className="login-btn">
          Quản lý
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;