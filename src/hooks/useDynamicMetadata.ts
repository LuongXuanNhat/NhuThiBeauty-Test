// src/hooks/useDynamicMetadata.ts
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { metadataMap } from "@/config/metadataMap";
import type { Metadata } from "next";

export const useDynamicMetadata = () => {
  const pathname = usePathname() ?? "";

  useEffect(() => {
    const metadata: Metadata | undefined = metadataMap[pathname];

    if (metadata?.title) {
      document.title = metadata.title.toString();
    }

    if (metadata?.description) {
      const existingMeta = document.querySelector("meta[name='description']");
      if (existingMeta) {
        existingMeta.setAttribute("content", metadata.description.toString());
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = metadata.description.toString();
        document.head.appendChild(meta);
      }
    }

    if (metadata?.icons && typeof metadata.icons === "string") {
      const existingLink = document.querySelector("link[rel='icon']");
      if (existingLink) {
        existingLink.setAttribute("href", metadata.icons);
      } else {
        const link = document.createElement("link");
        link.rel = "icon";
        link.href = metadata.icons;
        document.head.appendChild(link);
      }
    }
  }, [pathname]);
};
