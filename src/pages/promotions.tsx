import ComingSoonPage from "@/components/ComingSoon";
import {
  getMetadataByPath,
  useDynamicMetadata,
} from "@/hooks/useDynamicMetadata";
import { Metadata } from "next";

export const metadata: Metadata = getMetadataByPath("/promotions");

export default function Promotion() {
  useDynamicMetadata();

  return (
    <div>
      <ComingSoonPage />
    </div>
  );
}
