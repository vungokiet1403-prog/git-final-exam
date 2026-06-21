import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FoodSelection.css";

function FoodSelection() {

  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const [roomNumber, setRoomNumber] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderTime, setOrderTime] = useState("");

  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  // Load products
  useEffect(() => {

    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("Lỗi load sản phẩm:", err);
      });

  }, []);

  // Tính tổng tiền
  useEffect(() => {

    let sum = 0;

    products.forEach((p) => {
      const qty = cart[p.id] || 0;
      sum += qty * p.price;
    });

    setTotal(sum);

  }, [cart, products]);

  // Auto slider
  useEffect(() => {

    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {

      slider.scrollBy({ left: 260, behavior: "smooth" });

      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      }

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  // Thay đổi số lượng
  const handleQtyChange = (id, value) => {

    const qty = Math.max(0, parseInt(value) || 0);

    setCart({
      ...cart,
      [id]: qty
    });

  };

  // Thanh toán
  const handleCheckout = () => {

    if (total === 0) {
      alert("Bạn chưa chọn món nào!");
      return;
    }

    if (!roomNumber) {
      alert("Vui lòng nhập số phòng!");
      return;
    }

    if (!orderDate) {
      alert("Vui lòng chọn ngày!");
      return;
    }

    if (!orderTime) {
      alert("Vui lòng chọn giờ!");
      return;
    }

    const selectedItems = products
      .filter((p) => cart[p.id] > 0)
      .map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: cart[p.id]
      }));

    navigate("/payment-food", {
      state: {
        roomNumber,
        orderDate,
        orderTime,
        items: selectedItems,
        total
      }
    });

  };

  return (

        <div className="food-page">
        <section className="hero-banner">
        <div className="hero-overlay">
        </div>
      </section>

      <h2 className="food-title">Đồ ăn nhà Bắp dành cho bạn</h2>

        <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Tìm món ăn..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
          </div>

      <div className="slider-container">

        <button className="nav-btn left" onClick={scrollLeft}>❮</button>

        <div className="food-list" ref={sliderRef}>

                  {products
              .filter((product) =>
              product.name
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((product) => (

            <div key={product.id} className="food-card">

          <div className="food-image-wrapper">

            <img
              src={`http://localhost:5000${product.image_url}`}
              alt={product.name}
            />

            <span className="food-badge">
              ⭐ 5.0
            </span>

          </div>

          <div className="food-content">

            <h4>{product.name}</h4>

            <p className="price">
              {Number(product.price).toLocaleString()} VND
            </p>

            <div className="qty-box">

              <button
                onClick={() =>
                  handleQtyChange(
                    product.id,
                    (cart[product.id] || 0) - 1
                  )
                }
              >
                -
              </button>

              <span>
                {cart[product.id] || 0}
              </span>

              <button
                onClick={() =>
                  handleQtyChange(
                    product.id,
                    (cart[product.id] || 0) + 1
                  )
                }
              >
                +
              </button>

            </div>

          </div>

        </div>
          ))}

        </div>

        <button className="nav-btn right" onClick={scrollRight}>❯</button>

      </div>

      {/* Thông tin nhận đồ ăn */}

      <div className="delivery-card">

  <h3>🍽 Thông tin bạn nhận món</h3>

  <div className="delivery-grid">

    <div className="input-group">
      <label>Số phòng</label>
      <input
        type="text"
        placeholder="Ví dụ: VIP"
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
      />
    </div>

    <div className="input-group">
      <label>Ngày nhận </label>
      <input
        type="date"
        value={orderDate}
        onChange={(e) => setOrderDate(e.target.value)}
      />
    </div>

    <div className="input-group">
      <label>Khung giờ bạn muốn nhận đồ ăn</label>
      <input
        type="time"
        value={orderTime}
        onChange={(e) => setOrderTime(e.target.value)}
      />
    </div>

    </div>

    </div>

      {/* Thanh toán */}

      <div className="checkout-section">

        <h3>Tổng tiền: {total.toLocaleString()} VND</h3>

        <button
          className="checkout-btn"
          onClick={handleCheckout}
        >
          Thanh toán
        </button>

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ⬅ Quay lại
        </button>

      </div>

    </div>

  );
}

export default FoodSelection;