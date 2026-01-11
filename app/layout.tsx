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
    icon: "/favicon.png",
    apple: "/favicon.png",
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
  verification: {
    google: "Lwrtxms_oDEu-OkQBL7ZEwFX7yUL53wTypVZK2u7Ebk",
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
        {/* Google Analytics (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VSMT731ZCL" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-VSMT731ZCL');`,
          }}
        />
        {/* End Google Analytics */}
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M2XDHH2L');`,
          }}
        />
        {/* End Google Tag Manager */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="mx-auto max-w-5xl bg-white px-5 py-12 text-black">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M2XDHH2L"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
