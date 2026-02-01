import type { Metadata } from "next";
import Script from "next/script";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

// Pretendard 로컬 폰트 (CDN 대체용)
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  title: {
    default: "복지혜택 찾기 - 나에게 맞는 정부 지원금 계산기",
    template: "%s | 복지혜택 찾기",
  },
  description:
    "2026년 최신 정부 지원금, 청년 복지 혜택, 환급금을 한눈에 확인하세요. 나이, 소득, 거주지 기반 맞춤형 지원금 계산기를 제공합니다.",
  keywords: [
    "정부지원금",
    "청년지원금",
    "복지혜택",
    "지원금계산기",
    "청년적금",
    "미수령환급금",
    "2026청년지원",
  ],
  authors: [{ name: "복지혜택 찾기" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "복지혜택 찾기",
    title: "복지혜택 찾기 - 나에게 맞는 정부 지원금 계산기",
    description:
      "2026년 최신 정부 지원금, 청년 복지 혜택을 한눈에 확인하세요.",
  },
  twitter: {
    card: "summary_large_image",
    title: "복지혜택 찾기 - 정부 지원금 계산기",
    description: "나에게 맞는 정부 지원금을 찾아보세요.",
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
    google: "구글-사이트-인증-코드",
  },
};

// JSON-LD 구조화 데이터
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "복지혜택 찾기",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  description: "정부 지원금 및 복지 혜택 맞춤형 큐레이션 플랫폼",
  potentialAction: {
    "@type": "SearchAction",
    target: `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PC79PQ58');
        `}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className={`${notoSansKr.variable} antialiased min-h-screen flex flex-col`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PC79PQ58"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1163911659491070"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <GoogleAnalytics />
      </body>
    </html>
  );
}

