import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingComponent from "@/components/loading";
import { Review } from "@/model/review";
import { reviewDataSource } from "@/utils/reviewDataSource";

interface ReviewWithStringDate extends Omit<Review, "date"> {
  date: string | null;
}

interface StoriesDynamicRouteProps {
  blog?: ReviewWithStringDate;
  notFound?: boolean;
}

const StoriesDynamicRoute = ({ blog, notFound }: StoriesDynamicRouteProps) => {
  const router = useRouter();

  useEffect(() => {
    // Delay redirect để đảm bảo meta tags được crawl
    const timer = setTimeout(() => {
      const currentPath = window.location.pathname;
      router.replace("/reviews", currentPath, { shallow: true });
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  // Generate meta description from content
  const getMetaDescription = (content: string): string => {
    const textContent = content.replace(/<[^>]*>/g, "").trim();
    return textContent.length > 160
      ? textContent.substring(0, 157) + "..."
      : textContent;
  };

  // Get absolute image URL - FIX: Kiểm tra cấu trúc ảnh
  const getAbsoluteImageUrl = (imageUrl: string): string => {
    if (!imageUrl) return "";

    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }

    // Tạo absolute URL từ relative path
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    // Đảm bảo imageUrl bắt đầu bằng /
    const cleanImageUrl = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;

    return `${baseUrl}${cleanImageUrl}`;
  };

  // Format date
  const formatDate = (date: string | null): string => {
    if (!date) return "";
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  if (notFound || !blog) {
    return (
      <>
        <Head>
          <title>Bài viết không tồn tại - Nhu Thi Spa & Beauty</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div>Loading...</div>
      </>
    );
  }

  const metaDescription = getMetaDescription(blog.content);

  // FIX: Xử lý ảnh thumbnail đúng cách
  let ogImage = "";
  if (blog.images && blog.images.length > 0) {
    const firstImage = blog.images[0];
    const imageUrl = firstImage?.src;
    ogImage = getAbsoluteImageUrl(imageUrl);
  }

  // Fallback image nếu không có ảnh
  if (!ogImage) {
    ogImage = `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`;
  }

  const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${
    blog.id
  }/${createSlug(blog.name)}`;

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{blog.name} - Nhu Thi Spa & Beauty</title>
        <meta name="description" content={metaDescription} />
        <meta
          name="keywords"
          content="spa, beauty, làm đẹp, chăm sóc da, massage, Nhu Thi Spa"
        />

        {/* Open Graph / Facebook - ENHANCED */}
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={`${blog.name} - Nhu Thi Spa & Beauty`}
        />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={blog.name} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Nhu Thi Spa & Beauty" />
        <meta property="og:locale" content="vi_VN" />
        {blog.date && (
          <meta property="article:published_time" content={blog.date} />
        )}
        <meta property="article:section" content="Beauty & Spa" />
        <meta property="article:tag" content="spa,beauty,làm đẹp" />

        {/* Twitter Card - ENHANCED */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${blog.name} - Nhu Thi Spa & Beauty`}
        />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={blog.name} />
        <meta name="twitter:site" content="@nhuthispa" />
        <meta name="twitter:creator" content="@nhuthispa" />

        {/* Additional Meta for Zalo */}
        <meta
          property="zalo:title"
          content={`${blog.name} - Nhu Thi Spa & Beauty`}
        />
        <meta property="zalo:description" content={metaDescription} />
        <meta property="zalo:image" content={ogImage} />

        {/* LinkedIn specific */}
        <meta
          property="linkedin:title"
          content={`${blog.name} - Nhu Thi Spa & Beauty`}
        />
        <meta property="linkedin:description" content={metaDescription} />
        <meta property="linkedin:image" content={ogImage} />

        {/* SEO Meta */}
        <meta name="author" content="Nhu Thi Spa & Beauty" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={currentUrl} />

        {/* Structured Data - ENHANCED */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: blog.name,
              description: metaDescription,
              image: {
                "@type": "ImageObject",
                url: ogImage,
                width: 1200,
                height: 630,
              },
              author: {
                "@type": "Organization",
                name: "Nhu Thi Spa & Beauty",
              },
              publisher: {
                "@type": "Organization",
                name: "Nhu Thi Spa & Beauty",
                logo: {
                  "@type": "ImageObject",
                  url: `${
                    process.env.NEXT_PUBLIC_BASE_URL ||
                    "https://your-domain.com"
                  }/images/logo.png`,
                },
              },
              datePublished: blog.date || "",
              dateModified: blog.date || "",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": currentUrl,
              },
              url: currentUrl,
            }),
          }}
        />
      </Head>

      {/* FIX: Render một phần nội dung thay vì chỉ Loading */}
      <div style={{ display: "none" }}>
        {/* Hidden content for crawlers */}
        <h1>{blog.name}</h1>
        <p>{metaDescription}</p>
        {ogImage && <img src={ogImage} alt={blog.name} />}
      </div>

      <LoadingComponent />
    </>
  );
};

// Helper function tạo slug
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;

  if (!slug || !Array.isArray(slug) || slug.length === 0) {
    return {
      notFound: true,
    };
  }

  // Parse blog ID từ URL
  const blogId = parseInt(slug[0]);

  if (isNaN(blogId)) {
    return {
      notFound: true,
    };
  }

  const blog = reviewDataSource.find((b) => b.id === blogId);

  if (!blog) {
    return {
      notFound: true,
    };
  }

  // Verify slug matches (optional - for better SEO)
  const expectedSlug = createSlug(blog.name);
  const providedSlug = slug[1];

  // Nếu slug không khớp, redirect về URL đúng
  if (providedSlug && providedSlug !== expectedSlug) {
    return {
      redirect: {
        destination: `/reviews/${blogId}/${expectedSlug}`,
        permanent: true,
      },
    };
  }

  return {
    props: {
      blog: {
        ...blog,
        date: blog.date ? blog.date.toISOString() : null, // Convert Date to string
      },
    },
  };
};

export default StoriesDynamicRoute;
