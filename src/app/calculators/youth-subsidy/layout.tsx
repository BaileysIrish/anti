import { Metadata } from "next";

export const metadata: Metadata = {
    title: "청년 복지 혜택 통합 계산기 - 2026년 정부 지원금 찾기",
    description:
        "나이, 소득, 거주지를 입력하면 받을 수 있는 정부 지원금을 한눈에 확인! 청년도약계좌, 청년월세지원, 구직활동지원금 등 2026년 최신 지원금 정보를 제공합니다.",
    keywords: [
        "청년 지원금 계산기",
        "정부 지원금",
        "청년도약계좌",
        "청년내일저축계좌",
        "청년월세지원",
        "2026 청년 복지",
    ],
    openGraph: {
        title: "청년 복지 혜택 통합 계산기",
        description: "나에게 맞는 2026년 정부 지원금을 찾아보세요",
        type: "website",
    },
};

// JSON-LD 구조화 데이터
const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            name: "청년 복지 혜택 통합 계산기",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "KRW",
            },
        },
        {
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "청년도약계좌와 청년내일저축계좌 차이점은 무엇인가요?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "청년도약계좌는 월 70만원까지 저축 가능하고 소득 600만원 이하 조건입니다. 청년내일저축계좌는 저소득층 대상으로 더 높은 정부 매칭 비율을 제공합니다.",
                    },
                },
                {
                    "@type": "Question",
                    name: "지원금 신청 시 필요한 서류는 무엇인가요?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "일반적으로 신분증, 소득증빙서류, 주민등록등본이 필요합니다. 주거 관련 지원금은 임대차계약서가 추가로 필요합니다.",
                    },
                },
                {
                    "@type": "Question",
                    name: "소득이 없어도 받을 수 있는 지원금이 있나요?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "네, 청년구직활동지원금은 미취업 청년을 대상으로 하며, 국민내일배움카드는 소득과 관계없이 신청 가능합니다.",
                    },
                },
            ],
        },
        {
            "@type": "HowTo",
            name: "정부 지원금 신청 방법",
            step: [
                {
                    "@type": "HowToStep",
                    name: "자격 조건 확인",
                    text: "나이, 소득, 거주지 등 지원금별 자격 조건을 확인합니다.",
                },
                {
                    "@type": "HowToStep",
                    name: "필요 서류 준비",
                    text: "소득증빙서류, 주민등록등본 등 필요 서류를 미리 준비합니다.",
                },
                {
                    "@type": "HowToStep",
                    name: "온라인 신청",
                    text: "정부24, 복지로 등 공식 사이트에서 온라인으로 신청합니다.",
                },
                {
                    "@type": "HowToStep",
                    name: "심사 및 지급",
                    text: "심사 후 승인되면 지원금이 지급됩니다.",
                },
            ],
        },
    ],
};

export default function YouthSubsidyLayout({
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
