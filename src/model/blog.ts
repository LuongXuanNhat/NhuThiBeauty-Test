import { StaticImageData } from "next/image";

export interface Blog {
  id: number;
  title: string;
  subTitle: string | null;
  content: string;
  date: Date | null;
  images: StaticImageData[] | null;
}
