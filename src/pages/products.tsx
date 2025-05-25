import ComingSoonPage from "@/components/ComingSoon";
import { useDynamicMetadata } from "@/hooks/useDynamicMetadata";

export default function Products() {
  useDynamicMetadata();

  return (
    <div>
      <ComingSoonPage />
    </div>
  );
}
