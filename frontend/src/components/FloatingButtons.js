import React from "react";
import "./FloatingButtons.css";
import { FaArrowUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function FloatingButtons() {
  const location = useLocation();

  if(location.pathname.startsWith("/admin")){
    return null;
    }
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="floating-buttons">

      {/* Scroll lên đầu */}
      <button className="btn-top" onClick={scrollTop}>
        <FaArrowUp />
      </button>

      {/* Messenger */}
      <a
        href="https://m.me/"
        target="_blank"
        rel="noreferrer"
        className="btn-messenger"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
          alt="Messenger"
        />
      </a>

      {/* Zalo */}
      <a
        href="https://zalo.me/0977460996"
        target="_blank"
        rel="noreferrer"
        className="btn-zalo"
      >
        Zalo
      </a>

    </div>
  );
}

export default FloatingButtons;