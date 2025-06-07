import ComingSoonPage from "@/components/ComingSoon";
import {
  getMetadataByPath,
  useDynamicMetadata,
} from "@/hooks/useDynamicMetadata";
import { Metadata } from "next";

export const metadata: Metadata = getMetadataByPath("/products");

export default function Products() {
  useDynamicMetadata();

  return (
    <div>
      <ComingSoonPage />
    </div>
  );
}
