import { Blog } from "@/model/blog";

import blog1a from "@/assets/blogs/1/473708376_122132918660545409_9103638148811620984_n.jpg";
import blog1b from "@/assets/blogs/1/474585068_122133407078545409_3111072117019857680_n.jpg";

import blog2a from "@/assets/blogs/2/facial-recognition-software.jpg";
import blog2b from "@/assets/blogs/2/happy-thai-asian-woman-enjoying-shopping-she-is-carrying-shopping-bags-showing-mobile-phone.jpg";

import blog3a from "@/assets/blogs/3/2.png";
import blog3b from "@/assets/blogs/3/3.png";

import blog5a from "@/assets/blogs/5/9649099_6913-01.png";

export const blogDataSource: Blog[] = [
  {
    id: 1,
    title: "Lợi ích của massage thư giãn đối với sức khỏe",
    subTitle:
      "Khám phá cách massage giúp giảm căng thẳng và cải thiện giấc ngủ",
    content: `
      <div class="text-gray-800 leading-relaxed text-justify">
        <p class="mb-4">
          <strong>Massage thư giãn</strong> là một trong những phương pháp chăm sóc sức khỏe và làm đẹp được ưa chuộng nhất hiện nay. Không chỉ mang lại cảm giác dễ chịu và thư thái, massage còn có tác động sâu đến <strong>sức khỏe thể chất và tinh thần</strong>. Khi được thực hiện đúng cách, liệu pháp này giúp <strong>giảm căng thẳng</strong>, hỗ trợ <strong>lưu thông máu</strong> tốt hơn và nâng cao <strong>chất lượng giấc ngủ</strong>.
        </p>
        <p class="mb-4">
          Trong cuộc sống hiện đại, con người phải đối mặt với nhiều áp lực từ công việc, học tập và các mối quan hệ xã hội. Việc chịu đựng áp lực trong thời gian dài khiến cơ thể rơi vào trạng thái <strong>mệt mỏi kéo dài</strong>, đau nhức cơ, khó ngủ và dễ bị stress. Massage thư giãn, đặc biệt là các kỹ thuật như <strong>massage Thụy Điển</strong>, <strong>massage đá nóng</strong>, hay <strong>aromatherapy</strong> (liệu pháp tinh dầu), có thể giúp giải tỏa những áp lực đó một cách tự nhiên.
        </p>
        <p class="mb-4">
          Một trong những lợi ích nổi bật của massage là khả năng <strong>kích thích hệ thần kinh</strong> và làm dịu tâm trí. Việc xoa bóp các vùng cơ bị căng cứng sẽ làm giảm sự tích tụ của <strong>acid lactic</strong> và các độc tố trong cơ thể, giúp bạn cảm thấy <strong>sảng khoái</strong> và dễ chịu hơn. Ngoài ra, massage còn làm tăng sản sinh các hormone như <strong>endorphin</strong> và <strong>serotonin</strong> – hai chất dẫn truyền thần kinh giúp cải thiện tâm trạng và giảm lo âu.
        </p>
        <p class="mb-4">
          Không dừng lại ở đó, massage còn có tác dụng tích cực đến <strong>hệ miễn dịch</strong> bằng cách thúc đẩy <strong>tuần hoàn bạch huyết</strong>, giúp loại bỏ độc tố ra ngoài cơ thể. Đối với những người thường xuyên làm việc văn phòng, ít vận động, massage giúp cải thiện <strong>tư thế cơ thể</strong>, giảm đau cổ vai gáy và ngăn ngừa các vấn đề về cột sống.
        </p>
        <p class="mb-4">
          Đặc biệt, trong các spa hiện đại, massage thư giãn thường đi kèm với không gian yên tĩnh, âm nhạc nhẹ nhàng và mùi hương tinh dầu dễ chịu, giúp bạn <strong>thư giãn toàn diện</strong>. Đây là nơi lý tưởng dành cho những ai muốn tìm lại sự cân bằng trong cuộc sống bận rộn.
        </p>
        <p>
          Nếu bạn đang cảm thấy căng thẳng, mất ngủ hay đau mỏi cơ thể, đừng ngần ngại dành cho mình một buổi <strong>trị liệu massage</strong> chuyên nghiệp. Chỉ cần 60 phút thư giãn, bạn sẽ cảm nhận được sự khác biệt rõ rệt cả về <strong>tinh thần</strong> lẫn <strong>sức khỏe</strong>.
        </p>
      </div>
    `,
    date: new Date("2024-06-15"),
    images: [blog1a, blog1b],
  },
  {
    id: 2,
    title: "5 bước chăm sóc da mặt đúng cách tại spa",
    subTitle: "Từ làm sạch đến dưỡng ẩm – quy trình chuẩn không thể bỏ qua",
    content:
      "Một quy trình chăm sóc da mặt chuyên nghiệp bao gồm: tẩy trang, rửa mặt, tẩy tế bào chết, đắp mặt nạ và dưỡng ẩm. Spa sử dụng các sản phẩm chuyên sâu giúp da hấp thu tốt hơn, mang lại làn da khỏe mạnh và mịn màng.",
    date: new Date("2024-05-30"),
    images: [blog2a, blog2b],
  },
  {
    id: 3,
    title: "Công nghệ trẻ hóa da bằng ánh sáng sinh học",
    subTitle: null,
    content:
      "Liệu pháp ánh sáng sinh học đang dần trở thành xu hướng mới trong ngành làm đẹp. Bằng cách sử dụng các bước sóng ánh sáng khác nhau, công nghệ này giúp kích thích sản sinh collagen, làm mờ nếp nhăn và cải thiện sắc tố da trở nên săn chắc hơn",
    date: new Date("2024-07-05"),
    images: [blog3a, blog3b],
  },
  {
    id: 4,
    title: "Tại sao bạn nên thử trị liệu đá nóng ít nhất một lần?",
    subTitle: "Trải nghiệm thư giãn sảng khoái cho cả cơ thể và tâm trí",
    content:
      "Trị liệu đá nóng là phương pháp sử dụng đá bazan nóng đặt lên các huyệt đạo để giảm đau nhức và cân bằng năng lượng. Đây là phương pháp lý tưởng cho người thường xuyên mỏi cơ, mất ngủ hoặc bị stress kéo dài.",
    date: new Date("2024-06-22"),
    images: null,
  },
  {
    id: 5,
    title: "Xu hướng làm đẹp tự nhiên lên ngôi",
    subTitle: "Tối giản nhưng hiệu quả – bí quyết giữ gìn vẻ đẹp bền vững",
    content:
      "Làm đẹp tự nhiên với nguyên liệu hữu cơ, ít hóa chất đang trở thành xu hướng được yêu thích. Từ dầu dừa, trà xanh đến nha đam, các thành phần thiên nhiên mang lại hiệu quả rõ rệt khi sử dụng đúng cách.",
    date: new Date("2024-07-18"),
    images: [blog5a],
  },
];
