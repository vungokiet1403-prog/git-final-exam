import React, {useEffect, useState} from "react";
import axios from "axios";

function AdminFoodOrders(){

const [orders,setOrders]=useState([]);

useEffect(()=>{
 axios.get("http://localhost:5000/api/admin/food-orders")
 .then(res=>setOrders(res.data))
},[]);

return(

<div className="admin-container">

<h2>🍔 Đơn đồ ăn khách</h2>

<table className="admin-table">

<thead>
<tr>
<th>Phòng</th>
<th>Món</th>
<th>Số lượng</th>
<th>Thời gian</th>
</tr>
</thead>

<tbody>

{orders.map(o=>(
<tr key={o.id}>
<td>{o.room_number}</td>
<td>{o.name}</td>
<td>{o.quantity}</td>
<td>{o.created_at}</td>
</tr>
))}

</tbody>

</table>

</div>

);

}

export default AdminFoodOrders;