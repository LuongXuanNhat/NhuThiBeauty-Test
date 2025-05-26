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
    content:
      "Massage thư giãn không chỉ giúp cơ thể thoải mái mà còn hỗ trợ giảm stress, cải thiện tuần hoàn máu và nâng cao chất lượng giấc ngủ. Đây là liệu pháp phổ biến trong các spa hiện đại, phù hợp với người bận rộn, thường xuyên làm việc căng thẳng.",
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
      "Liệu pháp ánh sáng sinh học đang dần trở thành xu hướng mới trong ngành làm đẹp. Bằng cách sử dụng các bước sóng ánh sáng khác nhau, công nghệ này giúp kích thích sản sinh collagen, làm mờ nếp nhăn và cải thiện sắc tố da một cách an toàn.",
    date: new Date("2024-07-05"),
    images: [blog3a, blog3b],
  },
  {
    id: 4,
    title: "Tại sao bạn nên thử trị liệu đá nóng ít nhất một lần?",
    subTitle: "Trải nghiệm thư giãn tuyệt vời cho cả cơ thể và tâm trí",
    content:
      "Trị liệu đá nóng là phương pháp sử dụng đá bazan nóng đặt lên các huyệt đạo để giảm đau nhức và cân bằng năng lượng. Đây là lựa chọn lý tưởng cho người thường xuyên mỏi cơ, mất ngủ hoặc bị stress kéo dài.",
    date: new Date("2024-06-22"),
    images: null,
  },
  {
    id: 5,
    title: "Xu hướng làm đẹp tự nhiên lên ngôi",
    subTitle: "Tối giản nhưng hiệu quả – bí quyết giữ gìn vẻ đẹp bền vững",
    content:
      "Làm đẹp tự nhiên với nguyên liệu hữu cơ, ít hóa chất đang trở thành xu hướng được yêu thích. Từ dầu dừa, trà xanh đến nha đam, các thành phần thiên nhiên không chỉ an toàn mà còn mang lại hiệu quả rõ rệt khi sử dụng đúng cách.",
    date: new Date("2024-07-18"),
    images: [blog5a],
  },
];
