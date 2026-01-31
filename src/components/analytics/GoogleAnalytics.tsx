import Script from "next/script";

interface GoogleAnalyticsProps {
    gaId?: string;
}

// Google Analytics 스크립트 컴포넌트
export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
    const measurementId = gaId || process.env.NEXT_PUBLIC_GA_ID;

    if (!measurementId || measurementId === "G-XXXXXXXXXX") {
        return null; // 개발 환경에서는 스크립트 로드 안함
    }

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
            </Script>
        </>
    );
}
