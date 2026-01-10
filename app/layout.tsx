import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "정부지원금 알리미",
  description: "각종 정부지원금, 정책자금 등 정보를 얻어가실 수 있습니다. 정부 보조금 및 장려금 정보, 지원금 등 내가 받을 수 있는 지원금 혜택 확인하기",
  metadataBase: new URL("https://policyinfolab.xyz"),
  keywords: ["정부 지원금", "정책자금", "보조금", "장려금", "지원금 혜택"],
  authors: [{ name: "정부지원금 알리미" }],
  creator: "정부지원금 알리미",
  publisher: "정부지원금 알리미",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "정부지원금 알리미",
    description: "각종 정부지원금, 정책자금 등 정보를 얻어가실 수 있습니다. 정부 보조금 및 장려금 정보, 지원금 등 내가 받을 수 있는 지원금 혜택 확인하기",
    type: "website",
    locale: "ko_KR",
    url: "https://policyinfolab.xyz",
    siteName: "정부지원금 알리미",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 1200,
        alt: "정부지원금 알리미",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "정부지원금 알리미",
    description: "각종 정부지원금, 정책자금 등 정보를 얻어가실 수 있습니다. 정부 보조금 및 장려금 정보, 지원금 등 내가 받을 수 있는 지원금 혜택 확인하기",
    images: ["/og-image.png"],
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
    "name": "정부지원금 알리미",
    "alternateName": "정부지원금 알리미",
    "url": "https://policyinfolab.xyz",
    "description": "각종 정부지원금, 정책자금 등 정보를 얻어가실 수 있습니다. 정부 보조금 및 장려금 정보, 지원금 등 내가 받을 수 있는 지원금 혜택 확인하기",
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
