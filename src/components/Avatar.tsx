import React from "react";
import Image, { StaticImageData } from "next/image";
import { getInitialsName } from "@/utils/getInitialsName";

type Props = {
  name: string;
  avatar?: StaticImageData | null;
  size?: number;
};

export const InitialAvatar = ({ name, avatar = null, size = 40 }: Props) => {
  const initials = getInitialsName(name);

  if (avatar) {
    return (
      <div style={{ width: size, height: size }} className="relative">
        <Image
          src={avatar}
          alt={name}
          fill
          className="rounded-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="rounded-full bg-pink-500 text-white font-bold flex items-center justify-center"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  );
};
