import axios from "axios";
import { useEffect, useState } from "react";

function StaffManagement() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/admin/staff", {
      headers: { Authorization: token }
    }).then(res => setStaff(res.data));
  }, []);

  return (
    <div>
      <h2>Danh sách nhân viên</h2>
      {staff.map(s => (
        <div key={s.id}>{s.full_name} - {s.username}</div>
      ))}
    </div>
  );
}

export default StaffManagement;