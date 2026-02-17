import { Metadata } from "next";
import Link from "@/components/common/Link";

import RealEstateClient from "@/components/calculator/RealEstateClient";

export const metadata: Metadata = {
    title: "부동산 거래 예시 조회 - 아파트 시세 참고",
    description:
        "지역별 부동산 거래 예시 데이터를 확인하고, 실제 거래 전 국토교통부 공식 시스템에서 최신 정보를 재확인하세요.",
    robots: {
        index: false,
        follow: true,
    },
    keywords: [
        "부동산 실거래가",
        "아파트 시세",
        "아파트 실거래가",
        "오피스텔 시세",
        "부동산 가격",
    ],
    alternates: {
        canonical: "/calculators/real-estate",
    },
};

export default function RealEstatePage() {
    return (
        <div className="py-8">
            <div className="container-custom">
                {/* 헤더 */}
                <div className="text-center mb-8">
                    <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                        🏠 거래 예시 참고용 화면
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        부동산 거래 예시 조회
                    </h1>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto">
                        아파트, 오피스텔, 연립다세대 등 부동산 실거래가를
                        참고용으로 확인할 수 있습니다.
                    </p>
                </div>

                {/* 상단 광고 */}


                {/* 실거래가 조회 UI */}
                <RealEstateClient />

                {/* 중간 광고 */}


                {/* SEO 콘텐츠 */}
                <article className="max-w-2xl mx-auto mt-12 prose prose-lg">
                    <h2 className="text-2xl font-bold mb-6">
                        부동산 실거래가 조회 방법과 활용 가이드
                    </h2>

                    <p className="text-text-muted leading-relaxed mb-6">
                        부동산 거래 시 가장 중요한 것은 정확한 시세 파악입니다.
                        본 페이지의 예시 데이터를 통해 검색 흐름을 먼저 파악한 뒤,
                        최종 판단은 국토교통부에서 제공하는 실거래가 공개시스템으로
                        반드시 확인해야 합니다.
                    </p>

                    <h3 className="text-xl font-bold mt-8 mb-4 text-text">📊 실거래가 vs 호가</h3>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                        <ul className="space-y-3 text-text-muted">
                            <li>
                                <strong>실거래가:</strong> 실제로 거래가 체결된 가격으로, 국토부에 신고된 가격입니다.
                            </li>
                            <li>
                                <strong>호가:</strong> 매도자가 희망하는 판매 가격으로, 실제 거래가와 차이가 있을 수 있습니다.
                            </li>
                        </ul>
                    </div>

                    <h3 className="text-xl font-bold mt-8 mb-4 text-text">🏠 부동산 구매 시 체크리스트</h3>

                    <ul className="list-disc pl-6 text-text-muted space-y-2">
                        <li>최근 3년간 실거래가 추이 확인</li>
                        <li>같은 단지 내 평형별 가격 비교</li>
                        <li>주변 개발 호재 및 악재 확인</li>
                        <li>청약 가점 계산 (무주택 기간, 부양가족 등)</li>
                    </ul>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mt-8">
                        <h4 className="font-bold text-amber-800 mb-2">💰 청년 주거 지원</h4>
                        <p className="text-amber-700">
                            첫 주택 구매를 고려 중이라면, 청년 전용 주거 지원 정책도 함께 확인하세요.
                            <Link href="/calculators/youth-subsidy" className="text-primary font-semibold ml-1">
                                지원금 계산기 →
                            </Link>
                        </p>
                    </div>

                    <div className="bg-slate-50 border border-gray-200 rounded-xl p-6 mt-8">
                        <h4 className="font-bold text-slate-800 mb-2">작성일/출처</h4>
                        <p className="text-slate-600 text-sm">작성일: 2026년 2월 13일 · 최종 수정일: 2026년 2월 13일</p>
                        <a
                            href="https://rt.molit.go.kr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-2 text-primary font-semibold hover:underline"
                        >
                            국토교통부 실거래가 공개시스템
                        </a>
                    </div>
                </article>

                {/* 하단 광고 */}

            </div>
        </div>
    );
}
