import { Review } from "@/model/review";

import huyenAvatar from "@/assets/reviews/byMay2025/1_Huyen/z6479146948089_617958a32398c4b5e283ba685c83d8ee.jpg";
import huyenImg1 from "@/assets/reviews/byMay2025/1_Huyen/z6479146937163_de37c0e977dcedf444430403b09aa003.jpg";
import huyenImg2 from "@/assets/reviews/byMay2025/1_Huyen/z6479146940449_fa3c533c957bec1912474ecfb229a770.jpg";
import huyenImg3 from "@/assets/reviews/byMay2025/1_Huyen/z6479146944301_4af8996d123b50606b8d51952b9367a1.jpg";

import tuyenAvatar from "@/assets/reviews/byMay2025/3_Tuyen_Luong/image.png";
import tuyenImg1 from "@/assets/reviews/byMay2025/3_Tuyen_Luong/z6597630262316_6e492865050186fd4a7109deda17a0b3.jpg";

import ngocYenImg1 from "@/assets/reviews/byMay2025/2_Ngoc_Yen/z6596585492937_9924be510265b384540bb4acf4294584.jpg";
import ngocYenImg2 from "@/assets/reviews/byMay2025/2_Ngoc_Yen/z6596585500739_a8ce9c3c846628de3eaa3e3b2ea7389a.jpg";

export const reviewDataSource: Review[] = [
  {
    name: "Huyền",
    avatar: huyenAvatar,
    content: "Dịch vụ tốt, nhân viên thân thiện và rất chuyên nghiệp!",
    date: new Date("2024-11-12"),
    images: [huyenImg1, huyenImg2, huyenImg3],
  },
  {
    name: "Tuyen Luong",
    avatar: tuyenAvatar,
    content: "Tôi rất hài lòng sau khi sử dụng dịch vụ chăm sóc da ở đây.",
    date: new Date("2024-11-24"),
    images: [tuyenImg1],
  },
  {
    name: "Ngọc Yến",
    avatar: null,
    content: "Không gian spa rất sạch sẽ và dễ chịu. Sẽ quay lại lần sau!",
    date: new Date("2025-12-2"),
    images: [ngocYenImg1, ngocYenImg2],
  },
];
