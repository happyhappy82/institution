import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "정책정보Lab",
  description: "정부 지원금, 정책, 제도 정보를 제공하는 사이트 및 투자 가이드를 제공하는 사이트입니다.",
  metadataBase: new URL("https://policyinfolab.xyz"),
  keywords: ["정부 지원금", "아파트 리뷰", "오피스텔 추천", "부동산 투자", "매물 정보"],
  authors: [{ name: "PolicyInfoLab" }],
  creator: "PolicyInfoLab",
  publisher: "PolicyInfoLab",
  openGraph: {
    title: "정책정보Lab",
    description: "정부 지원금, 정책, 제도 정보를 제공하는 사이트 및 투자 가이드를 제공하는 사이트입니다.",
    type: "website",
    locale: "ko_KR",
    url: "https://policyinfolab.xyz",
    siteName: "정책정보Lab",
  },
  twitter: {
    card: "summary_large_image",
    title: "정책정보Lab",
    description: "정부 지원금, 정책, 제도 정보를 제공하는 사이트 및 투자 가이드를 제공하는 사이트입니다.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "정책정보Lab",
    "alternateName": "PolicyInfoLab",
    "url": "https://policyinfolab.xyz",
    "description": "정부 지원금, 정책, 제도 정보를 제공하는 사이트 및 투자 가이드를 제공하는 사이트입니다.",
  };

  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="mx-auto max-w-2xl bg-white px-5 py-12 text-black">
        {children}
      </body>
    </html>
  );
}
