import ComingSoonPage from "@/components/ComingSoon";
import {
  getMetadataByPath,
  useDynamicMetadata,
} from "@/hooks/useDynamicMetadata";
import { Metadata } from "next";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { TrackerEnum, trackPageView } from "tracker-api";

export const metadata: Metadata = getMetadataByPath("/products");

export default function Products() {
  useDynamicMetadata();
  const currentPath = usePathname() || "/services";
  useEffect(() => {
    const trackUserClick = async () => {
      await trackPageView({
        page_url: currentPath,
        event_name: TrackerEnum.EventName.link_click,
        event_type: TrackerEnum.EventType.pageview,
        browser: navigator.userAgent,
      });
    };

    setTimeout(() => {
      trackUserClick();
    }, 300);
  }, []);
  return (
    <div>
      <ComingSoonPage />
    </div>
  );
}
