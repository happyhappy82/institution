import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const baseUrl = "https://www.krgovpolicy.xyz";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "정부지원금 알리미",
    template: "%s | 정부지원금 알리미",
  },
  description: "각종 정부지원금, 정책자금 등 정보를 얻어가실 수 있습니다. 정부 보조금 및 장려금 정보, 지원금 등 내가 받을 수 있는 지원금 혜택 확인하기",
  metadataBase: new URL(baseUrl),
  keywords: ["정부 지원금", "정책자금", "보조금", "장려금", "지원금 혜택", "정부 보조금", "지원금 신청"],
  authors: [{ name: "정부지원금 알리미" }],
  creator: "정부지원금 알리미",
  publisher: "정부지원금 알리미",
  alternates: {
    canonical: baseUrl,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "정부지원금 알리미",
    description: "각종 정부지원금, 정책자금 등 정보를 얻어가실 수 있습니다. 정부 보조금 및 장려금 정보, 지원금 등 내가 받을 수 있는 지원금 혜택 확인하기",
    type: "website",
    locale: "ko_KR",
    url: baseUrl,
    siteName: "정부지원금 알리미",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "정부지원금 알리미 - 정부 지원금 정보 안내",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "정부지원금 알리미",
    description: "각종 정부지원금, 정책자금 등 정보를 얻어가실 수 있습니다. 정부 보조금 및 장려금 정보, 지원금 등 내가 받을 수 있는 지원금 혜택 확인하기",
    images: [
      {
        url: "/og-image.png",
        alt: "정부지원금 알리미 - 정부 지원금 정보 안내",
      },
    ],
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
    name: "정부지원금 알리미",
    alternateName: "정부지원금 알리미",
    url: baseUrl,
    description: "각종 정부지원금, 정책자금 등 정보를 얻어가실 수 있습니다. 정부 보조금 및 장려금 정보, 지원금 등 내가 받을 수 있는 지원금 혜택 확인하기",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "정부지원금 알리미",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    description: "각종 정부지원금, 정책자금 등 정보를 얻어가실 수 있습니다.",
  };

  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta name="naver-site-verification" content="95e7d0419f2bfbe91a17d28069c31ef455758def" />
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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

        {/* Google Analytics - loaded lazily after page load */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VSMT731ZCL"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VSMT731ZCL');
          `}
        </Script>

        {/* Google Tag Manager - loaded lazily after page load */}
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M2XDHH2L');
          `}
        </Script>
      </body>
    </html>
  );
}
