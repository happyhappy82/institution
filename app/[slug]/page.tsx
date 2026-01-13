import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Header from "@/components/Header";
import TableOfContents from "@/components/TableOfContents";
import QnA from "@/components/QnA";
import { getPolicyBySlug, getSortedPropertiesData } from "@/lib/policies";
import { extractQnA, removeQnASection } from "@/lib/qna-utils";
import type { Metadata } from "next";

const baseUrl = "https://policyinfolab.xyz";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const policies = getSortedPropertiesData();
  return policies.map((property) => ({
    slug: property.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = getPolicyBySlug(slug);

  if (!property) {
    return {
      title: "Not Found",
    };
  }

  const url = `${baseUrl}/${slug}`;

  return {
    title: property.title,
    description: property.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: property.title,
      description: property.excerpt,
      url: url,
      siteName: "정부지원금 알리미",
      locale: "ko_KR",
      type: "article",
      publishedTime: property.date,
      modifiedTime: property.date,
      authors: ["정부지원금 알리미"],
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description: property.excerpt,
      images: [
        {
          url: "/og-image.png",
          alt: property.title,
        },
      ],
    },
  };
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const property = getPolicyBySlug(slug);

  if (!property) {
    notFound();
  }

  const qnaItems = extractQnA(property.content);
  const contentWithoutQnA = removeQnASection(property.content);
  const url = `${baseUrl}/${slug}`;

  // Article Schema (완전한 형태)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: property.title,
    description: property.excerpt,
    image: `${baseUrl}/og-image.png`,
    author: {
      "@type": "Organization",
      name: "정부지원금 알리미",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "정부지원금 알리미",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
        width: 512,
        height: 512,
      },
    },
    datePublished: property.date,
    dateModified: property.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: property.title,
        item: url,
      },
    ],
  };

  // FAQPage Schema (QnA가 있는 경우에만)
  const faqSchema = qnaItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qnaItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } : null;

  return (
    <>
      <Header />
      <div className="lg:flex lg:gap-8">
        {/* Main Content */}
        <article className="lg:flex-1 lg:max-w-2xl">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
          {faqSchema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
          )}

          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-500">
            <ol className="flex items-center gap-2">
              <li>
                <a href="/" className="hover:text-blue-600">홈</a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span aria-current="page">{property.title}</span>
              </li>
            </ol>
          </nav>

          <div className="mb-8">
            <h1
              className="text-[42px] font-black leading-tight mb-4"
              style={{ color: property.lightColor }}
            >
              {property.title}
            </h1>
            <div className="flex gap-4 text-sm text-gray-600">
              <time dateTime={property.date}>{property.date}</time>
              <span>{property.readingTime}</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h2: ({ node, ...props }) => {
                  const text = props.children?.toString() || "";
                  const id = text.toLowerCase().replace(/\s+/g, "-");
                  return <h2 id={id} {...props} />;
                },
                h3: ({ node, ...props }) => {
                  const text = props.children?.toString() || "";
                  const id = text.toLowerCase().replace(/\s+/g, "-");
                  return <h3 id={id} {...props} />;
                },
                a: ({ node, href, children, ...props }) => {
                  const isExternal = href?.startsWith("http") && !href?.includes("policyinfolab.xyz");
                  return (
                    <a
                      href={href}
                      {...props}
                      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {children}
                    </a>
                  );
                },
              }}
            >
              {contentWithoutQnA}
            </ReactMarkdown>
          </div>

          <QnA items={qnaItems} />
        </article>

        {/* Sidebar TOC */}
        <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0">
          <TableOfContents />
        </aside>
      </div>
    </>
  );
}
