import React from "react";
import "./RulesPage.css";

function RulesPage() {
  return (
    <div className="rules-container">
      <div className="rules-content">

        <h1>Nội quy và quy định</h1>
        <div className="divider"></div>

        {/* 1 */}
        <section>
          <h2>1. Điều khoản cấm</h2>
          <ul>
            <li>Nghiêm cấm sử dụng chất cấm, chất kích thích và hành vi vi phạm pháp luật.</li>
            <li>Nghiêm cấm các hành vi liên quan đến mại dâm.</li>
            <li>Không hút thuốc, không sử dụng chất gây cháy nổ trong phòng/khuôn viên Home.</li>
            <li>Bạn đặt phòng khung giờ ban ngày yêu cầu phải đủ từ 16 tuổi trở lên.</li>
            <li>Bạn đặt phòng qua đêm hoặc cả ngày bắt buộc bạn phải trên 18 tuổi. Khách cố ý đặt phòng khi chưa đủ tuổi sẽ hoàn toàn tự chịu trách nhiệm trước pháp luật.</li>
            <li>Mọi vi phạm nghiêm trọng về pháp luật sẽ bị buộc rời khỏi Home ngay lập tức và không bồi hoàn.</li>
          </ul>
        </section>

        {/* 2 */}
        <section>
          <h2>2. Những lưu ý Check-in/Check-out</h2>
          <ul>
            <li>CCCD phải trùng khớp với người nhận phòng.</li>
            <li>Vui lòng check-in đúng khung giờ đã đặt. Home chưa hỗ trợ check-in sớm hơn giờ bạn đã đặt.</li>
            <li>Vui lòng check-out đúng khung giờ để đảm bảo công tác vệ sinh theo đúng quy trình.</li>
            <li>Trường hợp check-out trễ quá 5 phút, nhân viên Home xin phép dùng chìa khóa riêng để nhận lại phòng theo nội quy.</li>
            <li>Khi check-out vui lòng để lại khóa phòng đúng vị trí ban đầu.</li>
            <li>Vui lòng kiểm tra tư trang cá nhân trước khi rời khỏi Home. Home không chịu trách nhiệm sau khi bạn đã rời đi.</li>
          </ul>
        </section>

        {/* 3 */}
        <section>
          <h2>3. Những lưu ý trong thời gian lưu trú</h2>
          <ul>
            <li>Không chế biến đồ ăn nặng mùi. Trường hợp gây mùi sẽ phụ thu 100.000 VNĐ phí khử mùi.</li>
            <li>Thu gom rác, rửa chén sau khi sử dụng. Nếu không dọn dẹp sẽ phụ thu 100.000 VNĐ phí vệ sinh.</li>
            <li>Không dán vật phẩm lên tường. Trường hợp bong tróc sơn sẽ phụ thu 200.000 VNĐ phí sửa chữa.</li>
            <li>Giữ gìn tài sản trong Home. Mọi mất mát, hư hỏng sẽ phụ thu theo giá trị hiện hành.</li>
            <li>Ra vào nhớ đóng cổng kỹ. Nếu xảy ra mất mát do không đóng cổng, bạn sẽ chịu bồi thường.</li>
            <li>Sau 22h vui lòng giữ yên tĩnh để tránh ảnh hưởng khách khác.</li>
            <li>Tự bảo quản tư trang cá nhân trong thời gian lưu trú.</li>
          </ul>
        </section>

      </div>
    </div>
  );
}

export default RulesPage;