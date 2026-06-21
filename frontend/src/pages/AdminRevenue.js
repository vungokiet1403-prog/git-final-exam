import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminRevenue.css";

import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdminRevenue() {

  const [revenue, setRevenue] = useState({
    day: 0,
    week: 0,
    month: 0
  });

  const [topRooms, setTopRooms] = useState([]);

  useEffect(() => {
    fetchRevenue();
    fetchTopRooms();
  }, []);

  const fetchRevenue = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/bookings/revenue"
      );

      setRevenue({
        day: Number(res.data.day || 0),
        week: Number(res.data.week || 0),
        month: Number(res.data.month || 0)
      });

    } catch (err) {
      console.error(err);
    }
  };

  const fetchTopRooms = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/bookings/top-rooms"
      );

      setTopRooms(res.data);

    } catch (err) {

      console.error(err);

    }
  };

  const totalRevenue =
    revenue.day +
    revenue.week +
    revenue.month;

  const chartData = {
    labels: ["Hôm nay", "Tuần", "Tháng"],

    datasets: [
      {
        label: "Doanh thu (VNĐ)",

        data: [
          revenue.day,
          revenue.week,
          revenue.month
        ],

        backgroundColor: [
          "#4f46e5",
          "#7c3aed",
          "#06b6d4"
        ],

        borderRadius: 12
      }
    ]
  };

  const chartOptions = {
    responsive: true,

    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="revenue-page">

      <h1 className="revenue-title">
        📊 Dashboard Doanh Thu
      </h1>

      {/* KPI */}

      <div className="revenue-container">

        <div className="revenue-card">
          <span>💰</span>

          <div>
            <h3>Hôm nay</h3>

            <p>
              {revenue.day.toLocaleString()} đ
            </p>
          </div>
        </div>

        <div className="revenue-card">
          <span>📅</span>

          <div>
            <h3>Tuần này</h3>

            <p>
              {revenue.week.toLocaleString()} đ
            </p>
          </div>
        </div>

        <div className="revenue-card">
          <span>📈</span>

          <div>
            <h3>Tháng này</h3>

            <p>
              {revenue.month.toLocaleString()} đ
            </p>
          </div>
        </div>

        <div className="revenue-card total">
          <span>🏆</span>

          <div>
            <h3>Tổng doanh thu</h3>

            <p>
              {totalRevenue.toLocaleString()} đ
            </p>
          </div>
        </div>

      </div>

      {/* Chart */}

      <div className="chart-box">
      <h3>📊Thống kê doanh thu</h3>

      <Bar
        data={chartData}
        options={{
          responsive:true,
          plugins:{
            legend:{
              display:false
            }
          }
        }}
      />
    </div>

      {/* Top phòng */}

      <div className="top-room-box">

        <h3>
          🏆 Top phòng được đặt nhiều nhất
        </h3>

        <div className="top-room-list">

          {topRooms.map((room, index) => (

            <div
              className="top-room-card"
              key={index}
            >

              <div className="room-header">

                <h4>
                  {room.room_name}
                </h4>

                <span>
                  {room.totalBookings} lượt
                </span>

              </div>

              <div className="progress">

                <div
                  className="progress-fill"
                  style={{
                    width: `${Math.min(
                      room.totalBookings * 15,
                      100
                    )}%`
                  }}
                ></div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default AdminRevenue;