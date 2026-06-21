import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminUsers(){

  const [users,setUsers] = useState([])

  const fetchUsers = async ()=>{
    const res = await axios.get("http://localhost:5000/api/users")
    setUsers(res.data)
  }

  useEffect(()=>{
    fetchUsers()
  },[])

  return(

    <div className="admin-container">

      <h2>👤 Quản lý khách</h2>

      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>

          {users.map(u=>(
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.full_name}</td>
              <td>{u.email}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}

export default AdminUsers