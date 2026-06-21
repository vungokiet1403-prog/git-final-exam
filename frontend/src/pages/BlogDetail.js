import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./BlogDetail.css";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blogData = {
    1: {
  title: "Top 4 lý do bạn nên nghỉ dưỡng tại Bắp Homestay",
  content: (
    <>
      <p>
        Du lịch Cần Thơ đang ngày càng năng động và trẻ trung. 
        Thay vì ở khách sạn truyền thống, nhiều bạn trẻ và các cặp đôi 
        hiện nay lựa chọn homestay tự check-in — nơi bạn có thể tự nhận phòng, 
        tự do giờ giấc và tận hưởng không gian riêng tư như ở chính ngôi nhà của mình.
      </p>

      <h3>🌙1. Bắp Homestay – Homestay tự check-in nổi bật tại Cần Thơ</h3>

      <p><strong>📍 Địa chỉ:</strong> Số 1 Đường Số 31, Khu đô tái định cư đường Hoàng Quốc Việt, Ninh Kiều, Cần Thơ</p>

      <p><strong>💡 Điểm nổi bật:</strong></p>
      <ul>
        <li>Tự động check-in qua điện thoại, không cần gặp lễ tân</li>
        <li>Decor tinh tế, hiện đại, tone màu ấm áp phù hợp cho cặp đôi hoặc khách du lịch trẻ</li>
        <li>Trang bị máy chiếu màn hình lớn, Netflix, máy chơi game PS, ánh sáng LED, máy lạnh, wifi tốc độ cao</li>
        <li>Vị trí yên tĩnh, gần trung tâm – chỉ vài phút là đến các quán café chill và quán ăn nổi tiếng</li>
      </ul>

      <h3>🌇2. Homestay dành cho cặp đôi – không gian riêng tư, tối giản</h3>
      <p>
        Nếu bạn yêu thích phong cách tối giản, gọn gàng nhưng vẫn hiện đại,
        Cần Thơ có nhiều lựa chọn homestay tự check-in tương tự như BAPHOME.
      </p>
      <p>
        Hầu hết các phòng đều trang bị khóa điện tử, ánh sáng nhẹ,
        giường king size và không gian decor tinh tế,
        tạo cảm giác yên bình khi nghỉ ngơi.
      </p>

      <h3>☕3. Homestay tự check-in gần trung tâm Ninh Kiều</h3>
      <p>
        Khu vực Ninh Kiều là “điểm vàng” cho những ai muốn vừa gần trung tâm,
        vừa tránh xa tiếng ồn.
      </p>
      <p>
        BAPHOME là ví dụ tiêu biểu ở khu vực này,
        nơi bạn chỉ cần vài phút di chuyển là có thể thưởng thức
        ẩm thực địa phương hoặc ngắm sông Cần Thơ về đêm.
      </p>

      <h3>🎬4. Homestay có phòng xem phim riêng tư</h3>
      <p>
        Xu hướng phòng nghỉ tích hợp không gian giải trí đang rất được ưa chuộng.
      </p>

      <ul>
        <li>Máy chiếu đạt chứng chỉ Netflix</li>
        <li>Màn chiếu chuyên dụng cho chất lượng hình ảnh cao</li>
        <li>Đèn LED đổi màu tạo không gian ấm áp</li>
        <li>Decor sang trọng cho buổi tối “chill” đúng nghĩa</li>
      </ul>
    </>
  )
},
    2: {
  title: "Kinh nghiệm check-in không cần lễ tân tại Bắp Homestay",
  content: (
    <>
      <p>
        Bạn từng gặp cảnh đến homestay nhưng phải đợi check-in, gọi lễ tân,
        xác nhận mã phòng… trong khi bạn chỉ muốn nhanh chóng vào nghỉ ngơi?
      </p>

      <h3>🤖 1. Check-in thông minh – Vào phòng chỉ với vài giây</h3>

      <ul>
        <li>Nhận mã phòng và mã khóa cửa ngay sau khi đặt</li>
        <li>Tự mở cửa bằng mã khóa được cung cấp</li>
        <li>Không cần gặp lễ tân hay chờ xác nhận thủ công</li>
      </ul>

      <img
        src="/images/khoa1.jpg"
        alt="Khóa điện tử"
        className="blog-image"
      />

      <h3>💕2. Riêng tư tuyệt đối – Chuẩn staycation thế hệ mới</h3>

      <ul>
        <li>Nhận phòng riêng tư, không tiếp xúc</li>
        <li>Giữ trọn không gian yên tĩnh</li>
        <li>Tận hưởng kỳ nghỉ tự do như ở nhà</li>
      </ul>

      <img
        src="/images/thephong.jpg"
        alt="Thẻ phòng"
        className="blog-image"
      />

      <h3>🎬 3. Không chỉ tiện, mà còn cực chill</h3>

      <ul>
        <li>Máy chiếu chuẩn Netflix</li>
        <li>Bồn tắm, ghế tình yêu, ban công thoáng sáng</li>
        <li>Thiết kế đa phong cách: Signature, Bliss, Relax...</li>
      </ul>

      <img
        src="/images/phong.jpg"
        alt="Phòng homestay"
        className="blog-image"
      />
    </>
  )
},
    3: {
      title: "Gợi ý món ăn lãng mạn cho cặp đôi",
        content: (
    <>
      <p>
        Một buổi tối lãng mạn không chỉ đến từ không gian đẹp mà còn từ những món ăn tinh tế và cảm xúc bạn mang lại cho nhau. Tại Bắp Homestay, 
        bạn hoàn toàn có thể tự chuẩn bị một bữa tối nhẹ nhàng hoặc order combo ăn – uống để tận hưởng trọn vẹn khoảnh khắc riêng tư.
      </p>

      <h3>🥖1. Combo bánh mì & nước ngọt – đơn giản nhưng ấm áp </h3>

      <ul>
        <li>Một phần bánh mì nóng giòn</li>
        <li>Sting hoặc Pepsi mát lạnh</li>
        <li>lựa chọn nhanh gọn cho những cặp đôi thích sự nhẹ nhàng.</li>
      </ul>

      <img
        src="/images/doan1.jpg"
        alt="Combo đồ ăn"
        className="blog-image"
      />

      <h3>🍜 2. Mì hoặc đồ ăn nhanh – vừa ăn vừa xem phim </h3>

      <ul>
        <li>Không gian phòng chiếu riêng tư tại Bắp rất phù hợp cho những buổi “movie night”</li>
        <li>Một phần mì nóng, snack, nước ngọt và ánh đèn LED dịu nhẹ sẽ tạo nên một buổi tối cực chill.</li>
        <li>Tận hưởng kỳ nghỉ tự do như ở nhà</li>
      </ul>

      <img
        src="/images/doan2.jpg"
        alt="Combo đồ ăn 2"
        className="blog-image"
      />

      <h3>💡 Gợi ý nhỏ từ Bắp: </h3>

      <ul>
        <li>Đừng quên bật đèn LED tone ấm, chọn một bộ phim tình cảm và để mọi thứ diễn ra thật tự nhiên</li>
        <li>Không gian riêng tư, yên tĩnh sẽ giúp hai bạn tận hưởng trọn vẹn từng khoảnh khắc</li>
        <li>Bắp Homestay luôn sẵn sàng mang đến cho bạn một buổi tối lãng mạn đúng nghĩa – nơi cảm xúc được đặt lên hàng đầu</li>
      </ul>

      <img
        src="/images/doan3.jpg"
        alt="Combo đồ ăn 3"
        className="blog-image"
      />
    </>
  )
    },
    4: {
  title: "Không gian riêng tư cho cặp đôi tại Bắp Homestay",
  content: (
    <>
      <p>
        Bạn đang tìm một nơi thật riêng tư để cùng người thương tận hưởng những khoảnh khắc yên bình?
        Tại <strong>Bắp Homestay Cần Thơ</strong>, mỗi căn phòng đều được thiết kế để mang lại cảm giác 
        ấm áp – kín đáo – và trọn vẹn cảm xúc.
      </p>

      <h3>💖 Không gian dành riêng cho hai người</h3>

      <p>
        Không ồn ào như khách sạn đông đúc, không gò bó giờ giấc. 
        Bạn có thể tự check-in, tự do tận hưởng không gian riêng tư như chính ngôi nhà của mình.
      </p>

      <ul>
        <li>Phòng decor tone ấm áp, nhẹ nhàng</li>
        <li>Giường nệm cao cấp, êm ái</li>
        <li>Ánh sáng LED điều chỉnh theo cảm xúc</li>
        <li>Không gian kín đáo – yên tĩnh tuyệt đối</li>
      </ul>

      <img
        src="/images/khonggian1.jpg"
        alt="Không gian riêng tư"
        className="blog4-image"
      />

      <h3>🎬 Trải nghiệm xem phim chuẩn rạp ngay trong phòng</h3>

      <p>
        Máy chiếu chất lượng cao tích hợp Netflix giúp bạn có trải nghiệm hình ảnh 
        <strong>Full HD đến 4K</strong>, âm thanh sống động như đang ngồi giữa rạp phim mini.
      </p>

      <ul>
        <li>Màn chiếu lớn chuyên dụng</li>
        <li>Chất lượng hình ảnh sắc nét</li>
        <li>Âm thanh chân thực – không lag – không mờ</li>
      </ul>

      <img
        src="/images/maychieu.jpg"
        alt="Máy chiếu Netflix"
        className="blog4-image"
      />

      <h3>🌙 Một buổi tối lãng mạn đúng nghĩa</h3>

      <p>
        Chỉ cần bật đèn LED tone vàng dịu, chọn một bộ phim yêu thích và để mọi thứ diễn ra tự nhiên.
        Không gian tại Bắp được thiết kế để giúp bạn <strong>tận hưởng từng khoảnh khắc</strong>.
      </p>

      <ul>
        <li>Phù hợp cho hẹn hò, kỷ niệm, sinh nhật</li>
        <li>Chill cá nhân hoặc nghỉ dưỡng cuối tuần</li>
        <li>Staycation riêng tư ngay trung tâm Ninh Kiều</li>
      </ul>

      <img
        src="/images/khonggian2.jpg"
        alt="Phòng lãng mạn"
        className="blog4-image"
      />
    </>
  )
},
    
    
  };

  const blog = blogData[id];

  if (!blog) {
    return <h2>Không tìm thấy bài viết</h2>;
  }

  return (
    <div className="blog-page">
  <div className="blog-wrapper">
    <h1>{blog.title}</h1>
    <div className="blog-content">
      {blog.content}
    </div>

    <button onClick={() => navigate(-1)}>← Quay lại</button>
  </div>
</div>
  );
};

export default BlogDetail;