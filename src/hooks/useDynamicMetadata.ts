"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { defaultMetadata, metadataMap } from "@/config/metadataMap";
import type { Metadata } from "next";

export const useDynamicMetadata = () => {
  const pathname = usePathname() ?? "";
  const previousPathname = useRef<string>("");
  const isUpdatingRef = useRef<boolean>(false);

  const updateMetaTags = useCallback(
    (metadata: Metadata) => {
      if (isUpdatingRef.current) return;
      isUpdatingRef.current = true;

      requestAnimationFrame(() => {
        try {
          // Update title
          if (metadata?.title && typeof metadata.title === "string") {
            const newTitle = metadata.title;
            if (document.title !== newTitle) {
              document.title = newTitle;
            }
          }

          // Update description
          if (metadata?.description) {
            const description = metadata.description.toString();
            let existingMeta = document.querySelector(
              "meta[name='description']"
            ) as HTMLMetaElement;

            if (existingMeta) {
              if (existingMeta.content !== description) {
                existingMeta.content = description;
              }
            } else {
              const meta = document.createElement("meta");
              meta.name = "description";
              meta.content = description;
              document.head.appendChild(meta);
            }
          }

          // Update keywords
          if (metadata?.keywords && Array.isArray(metadata.keywords)) {
            const keywordsString = metadata.keywords.join(", ");
            let existingKeywords = document.querySelector(
              "meta[name='keywords']"
            ) as HTMLMetaElement;

            if (existingKeywords) {
              if (existingKeywords.content !== keywordsString) {
                existingKeywords.content = keywordsString;
              }
            } else {
              const meta = document.createElement("meta");
              meta.name = "keywords";
              meta.content = keywordsString;
              document.head.appendChild(meta);
            }
          }

          // Update Open Graph tags
          if (metadata?.openGraph) {
            const og = metadata.openGraph;

            // OG Title
            if (og.title) {
              let existingOgTitle = document.querySelector(
                "meta[property='og:title']"
              ) as HTMLMetaElement;

              if (existingOgTitle) {
                existingOgTitle.content = og.title.toString();
              } else {
                const meta = document.createElement("meta");
                meta.setAttribute("property", "og:title");
                meta.content = og.title.toString();
                document.head.appendChild(meta);
              }
            }

            // OG Description
            if (og.description) {
              let existingOgDesc = document.querySelector(
                "meta[property='og:description']"
              ) as HTMLMetaElement;

              if (existingOgDesc) {
                existingOgDesc.content = og.description.toString();
              } else {
                const meta = document.createElement("meta");
                meta.setAttribute("property", "og:description");
                meta.content = og.description.toString();
                document.head.appendChild(meta);
              }
            }

            // OG URL
            if (og.url) {
              let existingOgUrl = document.querySelector(
                "meta[property='og:url']"
              ) as HTMLMetaElement;

              if (existingOgUrl) {
                existingOgUrl.content = og.url.toString();
              } else {
                const meta = document.createElement("meta");
                meta.setAttribute("property", "og:url");
                meta.content = og.url.toString();
                document.head.appendChild(meta);
              }
            }
          }

          // Update favicon
          if (metadata?.icons && typeof metadata.icons === "string") {
            const iconUrl = metadata.icons;
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
          }

          // Analytics tracking cho page views
          if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("config", "GA_MEASUREMENT_ID", {
              page_path: pathname,
              page_title: metadata?.title?.toString() || document.title,
            });
          }
        } catch (error) {
          console.error("Error updating metadata:", error);
        } finally {
          isUpdatingRef.current = false;
        }
      });
    },
    [pathname]
  );

  useEffect(() => {
    if (previousPathname.current === pathname) {
      return;
    }

    previousPathname.current = pathname;
    const metadata: Metadata | undefined = metadataMap[pathname];

    if (metadata) {
      updateMetaTags(metadata);
    }
  }, [pathname, updateMetaTags]);

  // Return current metadata for components that need it
  return {
    currentMetadata: metadataMap[pathname],
    pathname,
  };
};

export const getMetadataByPath = (path: string): Metadata => {
  return metadataMap[path] || defaultMetadata;
};

// HOC để wrap pages với metadata
// export const withDynamicMetadata = <P extends object>(
//   WrappedComponent: React.ComponentType<P>
// ) => {
//   const WithMetadata = (props: P) => {
//     useDynamicMetadata();
//     return <WrappedComponent {...props} />;
//   };

//   WithMetadata.displayName = `withDynamicMetadata(${WrappedComponent.displayName || WrappedComponent.name})`;

//   return WithMetadata;
// };
