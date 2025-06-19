import Carousel from "@/components/carousel/carousel";
import { Carousel_06_2025 } from "@/utils/carousel/item";
import { Metadata } from "next";
import logo from "@/assets/logo/logo.png";
import Service from "@/pages/services";

export const metadata: Metadata = {
  title: "Nhu Thi Beauty",
  description: "Tỏa sáng vẻ đẹp tự nhiên – Nâng niu từng khoảnh khắc",
  icons: logo.src,
  keywords: [
    "Như Thị Beauty trang chủ",
    "Như Thị Spa chính thức",
    "spa làm đẹp Như Thị",
    "Beauty spa Như Thị",
    "chăm sóc da Như Thị",
  ],
  openGraph: {
    title: "Như Thị Beauty - Spa Làm Đẹp Chuyên Nghiệp",
    description:
      "Như Thị Beauty & Spa - Spa làm đẹp với dịch vụ chăm sóc da, massage, trị liệu chuyên nghiệp",
    url: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

export default function Home() {
  return (
   <div className="">
  <section className="relative flex min-h-[400px] sm:min-h-[500px] mx-auto flex-wrap container">
    {/* Left side - Carousel */}
    <div className="w-full lg:w-1/2 order-1 lg:order-1">
      <Carousel images={Carousel_06_2025} objFit="object-contain" />
    </div>
    
    {/* Right side - Information */}
    <div className="w-full lg:w-1/2 order-2 lg:order-2 flex items-center justify-center p-6 sm:p-8 lg:p-12">
      <div className="text-center space-y-6 sm:space-y-8 max-w-md w-full">
        {/* Spa Name */}
        <div className="space-y-2 sm:space-y-3">
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold text-gray-900 tracking-wider leading-tight">
            NHƯ THỊ BEAUTY
          </h2>
        </div>
        
        {/* Address Section */}
        <div className="space-y-2">
          <p className="font-montserrat text-base sm:text-lg text-gray-800 font-medium px-4 sm:px-0">
            130 An Dương, Tây Hồ, Hà Nội
          </p>
        </div>
        
        {/* Hours Section */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="font-montserrat text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-widest">
            GIỜ MỞ CỬA
          </h3>
          <p className="font-montserrat text-base sm:text-lg text-gray-800">
            Hàng ngày: 8:30 AM - 9:30 PM
          </p>
        </div>
        
        {/* Contact Section */}
        <div className="space-y-2 pt-2">
          <a 
            href="tel:0917340716" 
            className="font-montserrat text-lg sm:text-xl font-semibold text-gray-900 hover:text-amber-600 transition-colors duration-300 inline-block"
          >
            0917340716
          </a>
        </div>
      </div>
    </div>
  </section>

  {/* Service | Dịch vụ  */}
  <Service isActive={false} />
</div>
  );
}
