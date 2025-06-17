import { Review } from "@/model/review";

import huyenAvatar from "@/assets/reviews/byMay2025/1_Huyen/z6479146948089_617958a32398c4b5e283ba685c83d8ee.jpg";
import huyenImg1 from "@/assets/reviews/byMay2025/1_Huyen/z6479146937163_de37c0e977dcedf444430403b09aa003.jpg";
import huyenImg2 from "@/assets/reviews/byMay2025/1_Huyen/z6479146940449_fa3c533c957bec1912474ecfb229a770.jpg";
import huyenImg3 from "@/assets/reviews/byMay2025/1_Huyen/z6479146944301_4af8996d123b50606b8d51952b9367a1.jpg";

import tuyenAvatar from "@/assets/reviews/byMay2025/3_Tuyen_Luong/image.png";
import tuyenImg1 from "@/assets/reviews/byMay2025/3_Tuyen_Luong/z6597630262316_6e492865050186fd4a7109deda17a0b3.jpg";

import ngocYenImg1 from "@/assets/reviews/byMay2025/2_Ngoc_Yen/z6596585492937_9924be510265b384540bb4acf4294584.jpg";
import ngocYenImg2 from "@/assets/reviews/byMay2025/2_Ngoc_Yen/z6596585500739_a8ce9c3c846628de3eaa3e3b2ea7389a.jpg";

import vanTraAvatar from "@/assets/reviews/byJune2025/4_Van_Tra/van-tra-01.jpg";
import vanTra01 from "@/assets/reviews/byJune2025/4_Van_Tra/van-tra-02.jpg";
import vanTra02 from "@/assets/reviews/byJune2025/4_Van_Tra/van-tra-03.jpg";

import ngThiChinh01 from "@/assets/reviews/byJune2025/5_Ng_Thi_Chinh/ng-thi-chinh-01.jpg";
import ngThiChinh02 from "@/assets/reviews/byJune2025/5_Ng_Thi_Chinh/ng-thi-chinh-02.jpg";
import ngThiChinh03 from "@/assets/reviews/byJune2025/5_Ng_Thi_Chinh/ng-thi-chinh-03.jpg";

import AD01 from "@/assets/reviews/byJune2025/6_An_Danh/co-giao-mn-huyen-anh-01.jpg";
import AD02 from "@/assets/reviews/byJune2025/6_An_Danh/co-giao-mn-huyen-anh-02.jpg"

export const reviewDataSource: Review[] = [
  {
    id: 1,
    name: "Huyền",
    avatar: huyenAvatar,
    content: "Dịch vụ tốt, nhân viên thân thiện và rất chuyên nghiệp!",
    date: new Date("2024-11-12"),
    images: [huyenImg1, huyenImg2, huyenImg3],
  },
  { 
    id: 2,
    name: "Tuyen Luong",
    avatar: tuyenAvatar,
    content: "Tôi rất hài lòng sau khi sử dụng dịch vụ chăm sóc da ở đây.",
    date: new Date("2024-11-24"),
    images: [tuyenImg1],
  },
  {
    id: 3,
    name: "Ngọc Yến",
    avatar: null,
    content: "Không gian spa rất sạch sẽ và dễ chịu. Sẽ quay lại lần sau!",
    date: new Date("2025-01-01"),
    images: [ngocYenImg1, ngocYenImg2],
  },
  
  {
    id: 4,
    name: "Vân Trà",
    avatar: vanTraAvatar,
    content: "Xem ảnh nhé mình review hơi bị tận tâm luôn!",
    date: new Date("2025-01-02"),
    images: [vanTra01, vanTra02],
  },
  
  {
    id: 5,
    name: "Nguyễn Thị Chinh",
    avatar: null,
    content: "Mình làm sạch da mặt và trừ mụn ở đây. Mình thấy da của mình sạch và bóng hơn rất nhiều. Ủng hộ chị chủ shop nhiều lần luôn.",
    date: new Date("2025-03-14"),
    images: [ngThiChinh01, ngThiChinh02, ngThiChinh03],
  },
  
  {
    id: 3,
    name: "Cô giáo trường mầm non Huyền Anh",
    avatar: null,
    content: "Ủng hộ tiệm.",
    date: new Date("2024-12-18"),
    images: [AD01, AD02],
  },
];
