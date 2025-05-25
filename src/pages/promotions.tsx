import ComingSoonPage from "@/components/ComingSoon";
import { useDynamicMetadata } from "@/hooks/useDynamicMetadata";

export default function Promotion() {
  useDynamicMetadata();

  return (
    <div>
      <ComingSoonPage />
    </div>
  );
}
