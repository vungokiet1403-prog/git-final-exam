import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

function AdminSidebar() {
  return (
    <div className="admin-sidebar">

      <h2>Nhà Bắp</h2>

      <NavLink to="/admin/dashboard">
        📊 Dashboard
      </NavLink>

      <NavLink to="/admin/rooms">
        🛏 Phòng
      </NavLink>

      <NavLink to="/admin/bookings">
        📅 Booking
      </NavLink>

      <NavLink to="/admin/foods">
        🍔 Đồ ăn
      </NavLink>

      <NavLink to="/admin/users">
        👥 Khách hàng
      </NavLink>

      <NavLink to="/admin/revenue">
        💰 Doanh thu
      </NavLink>

      <div className="sidebar-footer">
        <p>Admin Panel v1.0</p>
        <p>© Nhà Bắp Homestay</p>
      </div>

    </div>
  );
}

export default AdminSidebar;