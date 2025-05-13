import Carousel from "@/components/carousel/carousel";
import {
  CarouselFirst,
  CarouselServiceNail,
  CarouselServiceEyelash,
  CarouselServiceHeadWashing,
} from "@/utils/carousel/item";
import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import { Metadata } from "next";
import logo from "@/assets/logo/logo.png";

export const metadata: Metadata = {
  title: "Nhu Thi Beauty",
  description: "Làm đẹp chất lượng uy tín số 1 Việt Nam",
  icons: logo.src,
};

const listServices = [
  {
    images: CarouselServiceNail,
    title: "Nail",
    description: "Mô tả ngắn về nail",
    useCount: 123,
  },
  {
    images: CarouselServiceEyelash,
    title: "Nối mi",
    description: "Mô tả ngắn về nối mi",
    useCount: 23,
  },
  {
    images: CarouselServiceHeadWashing,
    title: "Gội đầu",
    description: "Mô tả ngắn về gội đầu",
    useCount: 1289,
  },
  {
    images: CarouselServiceHeadWashing,
    title: "Trị mụn",
    description: "Mô tả ngắn về gội đầu",
    useCount: 1223,
  },
  {
    images: CarouselServiceHeadWashing,
    title: "Peel da",
    description: "Mô tả ngắn về gội đầu",
    useCount: 12,
  },
  {
    images: CarouselServiceHeadWashing,
    title: "Triệt lông",
    description: "Mô tả ngắn về gội đầu",
    useCount: 1289,
  },
];

export default function Home() {
  return (
    <div className="">
      <Carousel images={CarouselFirst} />

      <div className="container mx-auto py-10 px-4" id="dich-vu">
        <div>
          <h3 className="text-center text-3xl font-bold mb-8 text-pink-600">
            Dịch vụ của chúng tôi
          </h3>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Service Image */}
                <div className="relative">
                  <Carousel images={service.images} height={240} />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-16"></div>
                </div>

                {/* Service Content */}
                <div className="p-5">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 mb-4">{service.description}</p>

                  {/* Usage Count */}
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <Users size={16} className="mr-1" />
                    <span title="Dữ liệu được thống kê theo từng tháng">
                      {service.useCount.toLocaleString()} lượt sử dụng
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/services/${service.title.toLowerCase()}`}
                    className="block w-full text-center bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md transition-colors duration-300"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
