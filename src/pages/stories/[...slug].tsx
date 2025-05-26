import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Blog } from "@/model/blog";
import { blogDataSource } from "@/utils/blogDataSource";

interface BlogWithStringDate extends Omit<Blog, "date"> {
  date: string | null;
}

interface StoriesDynamicRouteProps {
  blog?: BlogWithStringDate;
  notFound?: boolean;
}

const StoriesDynamicRoute = ({ blog, notFound }: StoriesDynamicRouteProps) => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to stories page với modal state
    const currentPath = window.location.pathname;
    router.replace("/stories", currentPath, { shallow: true });
  }, [router]);

  // Generate meta description from content
  const getMetaDescription = (content: string): string => {
    const textContent = content.replace(/<[^>]*>/g, "").trim();
    return textContent.length > 160
      ? textContent.substring(0, 157) + "..."
      : textContent;
  };

  // Get absolute image URL
  const getAbsoluteImageUrl = (imageUrl: string): string => {
    if (imageUrl?.startsWith("http")) {
      return imageUrl;
    }
    // Tạo absolute URL từ relative path
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com";
    return `${baseUrl}${imageUrl}`;
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
  const ogImage =
    blog.images && blog.images.length > 0
      ? getAbsoluteImageUrl(blog.images[0].src)
      : `${
          process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com"
        }/images/nhu-thi-spa-default.jpg`;

  const currentUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com"
  }/stories/${blog.id}/${createSlug(blog.title)}`;

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{blog.title} - Nhu Thi Spa & Beauty</title>
        <meta name="description" content={metaDescription} />
        <meta
          name="keywords"
          content="spa, beauty, làm đẹp, chăm sóc da, massage, Nhu Thi Spa"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={`${blog.title} - Nhu Thi Spa & Beauty`}
        />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={blog.title} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Nhu Thi Spa & Beauty" />
        <meta property="og:locale" content="vi_VN" />
        {blog.date && (
          <meta property="article:published_time" content={blog.date} />
        )}
        <meta property="article:section" content="Beauty & Spa" />
        <meta property="article:tag" content="spa,beauty,làm đẹp" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${blog.title} - Nhu Thi Spa & Beauty`}
        />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={blog.title} />
        <meta name="twitter:site" content="@nhuthispa" />

        {/* Additional Meta for Zalo */}
        <meta
          property="zalo:title"
          content={`${blog.title} - Nhu Thi Spa & Beauty`}
        />
        <meta property="zalo:description" content={metaDescription} />
        <meta property="zalo:image" content={ogImage} />

        {/* SEO Meta */}
        <meta name="author" content="Nhu Thi Spa & Beauty" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={currentUrl} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: blog.title,
              description: metaDescription,
              image: ogImage,
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
            }),
          }}
        />
      </Head>
      <div>Loading...</div>
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

  // Tìm blog theo ID
  const blog = blogDataSource.find((b) => b.id === blogId);

  if (!blog) {
    return {
      notFound: true,
    };
  }

  // Verify slug matches (optional - for better SEO)
  const expectedSlug = createSlug(blog.title);
  const providedSlug = slug[1];

  // Nếu slug không khớp, redirect về URL đúng
  if (providedSlug && providedSlug !== expectedSlug) {
    return {
      redirect: {
        destination: `/stories/${blogId}/${expectedSlug}`,
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
