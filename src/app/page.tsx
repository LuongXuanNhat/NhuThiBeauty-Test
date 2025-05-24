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
import Service from "@/pages/services";

export const metadata: Metadata = {
  title: "Nhu Thi Beauty",
  description: "Làm đẹp chất lượng uy tín số 1 Việt Nam",
  icons: logo.src,
};

export default function Home() {
  return (
    <div className="">
      <Carousel images={CarouselFirst} />

      {/* Service | Dịch vụ  */}
      <Service isActive={false} />
    </div>
  );
}
