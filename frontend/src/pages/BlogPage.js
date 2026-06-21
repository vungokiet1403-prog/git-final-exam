import React from "react";
import { useNavigate } from "react-router-dom";
import "./BlogPage.css";

const BlogPage = () => {
  const navigate = useNavigate();

  const blogs = [
    {
      id: 1,
      title: "Top 5 lý do bạn nên nghỉ dưỡng tại Bắp Homestay",
      description: "Không gian riêng tư, view đẹp và dịch vụ tận tâm.",
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
    },
    {
      id: 2,
      title: "Kinh nghiệm check-in không cần lễ tân",
      description: "Hướng dẫn nhận phòng tự động bằng email & QR.",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
    },
    {
      id: 3,
      title: "Gợi ý món ăn lãng mạn cho cặp đôi",
      description: "Những combo đồ ăn – nước uống cực chill.",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061"
    },
    {
      id: 4,
      title: "Máy chiếu và bồn tắm cực chill",
      description: "Những góc check-in cực đẹp cho giới trẻ.",
      image: "https://product.hstatic.net/200000984759/product/omestay-tphcm-theo-gio-gia-re-gan-san-bay-tan-son-nhat-co-ban-lam-viec_3b76d389465a40afa96be266e2bc3a66_1024x1024.jpg"
    },
    
  ];

  return (
    <div className="blog-container">
      <h1 className="blog-title">Tin tức & Bài viết</h1>

      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <img src={blog.image} alt={blog.title} />
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
            <button onClick={() => navigate(`/blog/${blog.id}`)}>
              Đọc thêm
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;