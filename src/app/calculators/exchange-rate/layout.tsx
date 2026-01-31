import { Metadata } from "next";

export const metadata: Metadata = {
    title: "환율 계산기 - 실시간 원화↔외화 변환",
    description:
        "한국수출입은행 기준 환율로 원화와 외화를 빠르게 계산하세요. 달러, 유로, 엔화 등 주요 통화 환율 정보와 환전 꿀팁을 제공합니다.",
    keywords: [
        "환율 계산기",
        "달러 환율",
        "엔화 환율",
        "유로 환율",
        "원화 환전",
        "해외 송금",
    ],
    openGraph: {
        title: "환율 계산기 - 실시간 원화↔외화 변환",
        description: "한국수출입은행 기준 환율로 빠른 환율 계산",
        type: "website",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "환율 계산기",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "KRW",
    },
    description: "한국수출입은행 기준 환율로 원화와 외화를 빠르게 계산",
};

export default function ExchangeRateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
