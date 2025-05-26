import { useEffect } from "react";
import { useRouter } from "next/router";

const StoriesDynamicRoute = () => {
  const router = useRouter();

  useEffect(() => {
    const currentPath = window.location.pathname;
    router.replace("/stories", currentPath, { shallow: true });
  }, [router]);

  return null; // Hoặc loading spinner
};

export default StoriesDynamicRoute;
