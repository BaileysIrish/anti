import Script from "next/script";

interface AdSenseProps {
    pId?: string;
}

// Google AdSense 스크립트 컴포넌트
export default function AdSenseScript({ pId }: AdSenseProps) {
    const publisherId = pId || process.env.NEXT_PUBLIC_ADSENSE_ID;

    if (!publisherId || publisherId === "ca-pub-xxxxxxxxxxxxxxxx") {
        return null; // 개발 환경에서는 스크립트 로드 안함
    }

    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
        />
    );
}
