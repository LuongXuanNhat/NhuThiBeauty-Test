import { StaticImageData } from "next/image";

export interface Review {
  name: string;
  avatar: StaticImageData | null;
  content: string;
  date: Date | null;
  images: StaticImageData[] | null;
}
