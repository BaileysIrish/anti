"use client";

import { useState } from "react";
import SubsidyForm from "@/components/calculator/SubsidyForm";
import SubsidyResult from "@/components/calculator/SubsidyResult";
import AdPlaceholder from "@/components/ads/AdPlaceholder";
import { UserProfile, Subsidy, filterSubsidies } from "@/lib/subsidies";

export default function YouthSubsidyCalculator() {
    const [results, setResults] = useState<Subsidy[] | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);

    const handleSubmit = (userProfile: UserProfile) => {
        setProfile(userProfile);
        const filtered = filterSubsidies(userProfile);
        setResults(filtered);
        // 결과로 스크롤
        setTimeout(() => {
            document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const handleReset = () => {
        setResults(null);
        setProfile(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="py-8">
            <div className="container-custom">
                {/* 헤더 */}
                <div className="text-center mb-8">
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                        🎯 2026년 최신 정보
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        청년 복지 혜택 통합 계산기
                    </h1>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto">
                        나이, 소득, 거주지, 취업 상태를 입력하면
                        받을 수 있는 정부 지원금을 한눈에 확인할 수 있습니다.
                    </p>
                </div>

                {/* 상단 광고 */}
                <AdPlaceholder variant="header" />

                {/* 계산기 영역 */}
                <div className="max-w-3xl mx-auto">
                    {!results ? (
                        <SubsidyForm onSubmit={handleSubmit} />
                    ) : (
                        <div id="results">
                            <SubsidyResult subsidies={results} onReset={handleReset} />
                        </div>
                    )}
                </div>

                {/* 중간 광고 (결과 전에만) */}
                {!results && <AdPlaceholder variant="inline" className="max-w-3xl mx-auto" />}

                {/* 블로그 콘텐츠 (SEO 및 애드센스 승인용 1,500자+ 콘텐츠) */}
                <article className="max-w-3xl mx-auto mt-12 prose prose-lg">
                    <h2 className="text-2xl font-bold mb-6">
                        2026년 정부 지원금, 더 많이 받는 방법 완벽 가이드
                    </h2>

                    <p className="text-text-muted leading-relaxed mb-6">
                        우리나라에는 청년을 위한 다양한 정부 지원금과 복지 혜택이 마련되어 있습니다.
                        하지만 많은 분들이 자신이 받을 수 있는 지원금이 무엇인지 모르거나,
                        신청 방법이 복잡해 포기하는 경우가 많습니다.
                        이 가이드에서는 2026년 현재 시행 중인 주요 청년 지원금을 총정리하고,
                        신청 시 주의사항과 꿀팁까지 알려드립니다.
                    </p>

                    <h3 className="text-xl font-bold mt-8 mb-4">
                        💰 2026년 핵심 청년 금융 지원 제도
                    </h3>

                    <p className="text-text-muted leading-relaxed mb-4">
                        <strong>청년도약계좌</strong>는 만 19~34세 청년이 월 최대 70만원을 5년간 저축하면
                        정부가 매칭 지원금을 더해주는 장기 저축 상품입니다.
                        소득에 따라 월 최대 24,000원의 정부기여금을 받을 수 있으며,
                        5년 만기 시 약 5,000만원 이상의 목돈을 마련할 수 있습니다.
                    </p>

                    <p className="text-text-muted leading-relaxed mb-4">
                        <strong>청년내일저축계좌</strong>는 근로·사업소득이 있는 저소득 청년(기준 중위소득 100% 이하)을
                        대상으로 합니다. 3년간 매월 10만원을 저축하면 정부가 최대 30만원까지 매칭해주어,
                        만기 시 최대 1,440만원의 목돈을 마련할 수 있습니다.
                    </p>

                    {/* 중간 광고 */}
                    <AdPlaceholder variant="inline" />

                    <h3 className="text-xl font-bold mt-8 mb-4">
                        🏠 주거 지원 - 월세와 전세 부담 줄이기
                    </h3>

                    <p className="text-text-muted leading-relaxed mb-4">
                        <strong>청년월세지원</strong>은 독립 거주하는 청년의 주거비 부담을 줄이기 위한 정책입니다.
                        월세 60만원 이하, 보증금 5,000만원 이하 조건을 충족하는 청년에게
                        월 최대 20만원씩 최대 12개월간 지원합니다.
                        1년간 최대 240만원의 실질적인 주거비 지원을 받을 수 있습니다.
                    </p>

                    <p className="text-text-muted leading-relaxed mb-4">
                        <strong>청년 전용 버팀목 전세자금대출</strong>은 무주택 청년을 위한 저금리 전세 대출입니다.
                        연 1.8%~2.4%의 낮은 금리로 최대 2억원까지 대출받을 수 있으며,
                        소득이 낮거나 다자녀 가정의 경우 추가 금리 우대도 가능합니다.
                    </p>

                    <h3 className="text-xl font-bold mt-8 mb-4">
                        📋 신청 시 반드시 알아야 할 주의사항
                    </h3>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                        <ul className="space-y-3 text-text-muted">
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold">1.</span>
                                <span><strong>소득 기준 확인:</strong> 대부분의 지원금은 월 소득 또는 중위소득 기준이 있습니다.
                                    세전 소득 기준인지, 가구 소득인지 정확히 확인하세요.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold">2.</span>
                                <span><strong>중복 수혜 불가:</strong> 청년도약계좌와 청년내일저축계좌는 동시 가입이 불가합니다.
                                    본인에게 유리한 상품을 선택하세요.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold">3.</span>
                                <span><strong>신청 기간 준수:</strong> 대부분의 지원금은 정해진 신청 기간이 있습니다.
                                    기한을 놓치면 다음 차수까지 기다려야 합니다.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold">4.</span>
                                <span><strong>서류 미리 준비:</strong> 소득증빙, 주민등록등본, 임대차계약서 등
                                    필요 서류를 미리 준비해두면 신청이 수월합니다.</span>
                            </li>
                        </ul>
                    </div>

                    <h3 className="text-xl font-bold mt-8 mb-4">
                        🔍 미수령 환급금, 내 돈 찾아가세요
                    </h3>

                    <p className="text-text-muted leading-relaxed mb-4">
                        많은 분들이 모르고 지나치는 것 중 하나가 바로 <strong>미수령 환급금</strong>입니다.
                        건강보험료 과납금, 국세·지방세 환급금, 통신요금 미환급금 등
                        본인도 모르게 받지 못한 돈이 있을 수 있습니다.
                        국민건강보험공단, 홈택스, 정부24 등에서 간편하게 조회할 수 있으니
                        꼭 한 번씩 확인해보시기 바랍니다.
                    </p>

                    <h3 className="text-xl font-bold mt-8 mb-4">
                        ✅ 지원금 활용 전략
                    </h3>

                    <p className="text-text-muted leading-relaxed mb-6">
                        정부 지원금은 단순히 받는 것에서 끝나지 않습니다.
                        받은 지원금을 어떻게 활용하느냐에 따라 자산 형성 속도가 달라집니다.
                        예를 들어, 청년월세지원으로 절약한 월 20만원을 적금에 추가로 저축하면
                        1년간 240만원을 더 모을 수 있습니다.
                        또한 청년도약계좌와 고금리 적금을 함께 활용하면
                        복리 효과로 자산을 더 빠르게 불릴 수 있습니다.
                    </p>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
                        <h4 className="font-bold text-amber-800 mb-2">💡 전문가 팁</h4>
                        <p className="text-amber-700">
                            지원금 신청은 빠를수록 좋습니다. 예산이 소진되면 조기 마감될 수 있으므로,
                            자격 조건이 되는 지원금은 바로 신청하세요.
                            위 계산기를 통해 본인이 받을 수 있는 지원금을 확인하고,
                            오늘 바로 신청해보시기 바랍니다.
                        </p>
                    </div>
                </article>

                {/* FAQ 섹션 (JSON-LD 연동) */}
                <section className="max-w-3xl mx-auto mt-12">
                    <h2 className="text-2xl font-bold mb-6">❓ 자주 묻는 질문</h2>
                    <div className="space-y-4">
                        <details className="card p-4 group">
                            <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                                청년도약계좌와 청년내일저축계좌 차이점은 무엇인가요?
                                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-4 text-text-muted">
                                청년도약계좌는 월 70만원까지 저축 가능하고 소득 600만원 이하 조건입니다.
                                청년내일저축계좌는 저소득층(소득 250만원 이하) 대상으로 더 높은 정부 매칭 비율을 제공합니다.
                                두 상품은 동시 가입이 불가하므로 본인 소득과 저축 여력에 맞게 선택하세요.
                            </p>
                        </details>

                        <details className="card p-4 group">
                            <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                                지원금 신청 시 필요한 서류는 무엇인가요?
                                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-4 text-text-muted">
                                일반적으로 신분증, 소득증빙서류(근로소득원천징수영수증, 소득금액증명원),
                                주민등록등본이 필요합니다. 주거 관련 지원금은 임대차계약서가 추가로 필요합니다.
                                정확한 서류는 각 지원금 공식 사이트에서 확인하세요.
                            </p>
                        </details>

                        <details className="card p-4 group">
                            <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                                소득이 없어도 받을 수 있는 지원금이 있나요?
                                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-4 text-text-muted">
                                네, 있습니다. 청년구직활동지원금은 미취업 청년을 대상으로 하며,
                                국민내일배움카드는 소득과 관계없이 직업훈련을 희망하는 누구나 신청 가능합니다.
                            </p>
                        </details>
                    </div>
                </section>

                {/* 하단 광고 */}
                <AdPlaceholder variant="footer" className="max-w-3xl mx-auto mt-12" />
            </div>
        </div>
    );
}
