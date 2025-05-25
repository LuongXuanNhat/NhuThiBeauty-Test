// src/hooks/useDynamicMetadata.ts
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { metadataMap } from "@/config/metadataMap";
import type { Metadata } from "next";

export const useDynamicMetadata = () => {
  const pathname = usePathname() ?? "";
  const previousPathname = useRef<string>("");

  useEffect(() => {
    if (previousPathname.current === pathname) {
      return;
    }

    previousPathname.current = pathname;
    const metadata: Metadata | undefined = metadataMap[pathname];

    if (metadata?.title) {
      // Sử dụng requestAnimationFrame để đảm bảo update DOM an toàn
      requestAnimationFrame(() => {
        const newTitle = metadata.title?.toString();
        if (newTitle && document.title !== newTitle) {
          document.title = newTitle;
        }
      });
    }

    // Update description
    if (metadata?.description) {
      requestAnimationFrame(() => {
        const description = metadata.description?.toString();
        let existingMeta = document.querySelector(
          "meta[name='description']"
        ) as HTMLMetaElement;

        if (existingMeta) {
          // if (existingMeta.content !== description) {
          //   existingMeta.content = description;
          // }
        } else {
          const meta = document.createElement("meta");
          meta.name = "description";
          // meta.content = description;
          document.head.appendChild(meta);
        }
      });
    }

    // Update favicon
    if (metadata?.icons && typeof metadata.icons === "string") {
      requestAnimationFrame(() => {
        const iconUrl = metadata.icons as string;
        let existingLink = document.querySelector(
          "link[rel='icon']"
        ) as HTMLLinkElement;

        if (existingLink) {
          if (existingLink.href !== iconUrl) {
            existingLink.href = iconUrl;
          }
        } else {
          const link = document.createElement("link");
          link.rel = "icon";
          link.href = iconUrl;
          document.head.appendChild(link);
        }
      });
    }
  }, [pathname]);
};
