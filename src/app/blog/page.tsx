import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "블로그 - 금융 정보 및 복지 가이드",
    description: "정부 지원금, 금융 상품, 부동산 정보 등 유용한 가이드를 제공합니다.",
};

// 블로그 포스트 더미 데이터
const blogPosts = [
    {
        slug: "youth-subsidy-guide-2026",
        title: "2026년 청년 지원금 총정리 - 놓치면 손해!",
        excerpt: "청년도약계좌, 청년내일저축계좌, 청년월세지원금 등 2026년 받을 수 있는 모든 지원금을 정리했습니다.",
        category: "지원금",
        emoji: "💰",
        date: "2026.01.30",
    },
    {
        slug: "subsidy-application-tips",
        title: "지원금 신청 성공 꿀팁 - 한 번에 통과하는 방법",
        excerpt: "서류 준비부터 신청까지, 탈락 없이 지원금을 받기 위한 핵심 노하우를 공개합니다.",
        category: "가이드",
        emoji: "📋",
        date: "2026.01.28",
    },
    {
        slug: "exchange-rate-saving-tips",
        title: "환전 수수료 90% 아끼는 방법",
        excerpt: "해외여행, 유학, 해외직구 시 환전 우대율 받는 꿀팁을 알려드립니다.",
        category: "금융",
        emoji: "💱",
        date: "2026.01.25",
    },
    {
        slug: "unclaimed-money-search",
        title: "내 돈 찾아가세요 - 미수령 환급금 조회 방법",
        excerpt: "건강보험료, 국세, 지방세 등 미수령 환급금을 한 번에 조회하는 방법을 알려드립니다.",
        category: "환급금",
        emoji: "🔍",
        date: "2026.01.22",
    },
    {
        slug: "first-home-loan-guide",
        title: "2026년 청년 전세/주택 대출 완벽 가이드",
        excerpt: "버팀목 전세대출, 디딤돌 대출 등 청년을 위한 주거 지원 대출을 비교 분석합니다.",
        category: "부동산",
        emoji: "🏠",
        date: "2026.01.20",
    },
    {
        slug: "savings-comparison-2026",
        title: "2026년 고금리 적금 TOP 5 비교",
        excerpt: "은행별 청년 우대 적금 상품을 금리, 조건, 우대 사항별로 비교했습니다.",
        category: "금융",
        emoji: "💳",
        date: "2026.01.18",
    },
];

const categoryColors: Record<string, string> = {
    지원금: "bg-blue-100 text-blue-800",
    가이드: "bg-green-100 text-green-800",
    금융: "bg-purple-100 text-purple-800",
    환급금: "bg-yellow-100 text-yellow-800",
    부동산: "bg-pink-100 text-pink-800",
};

export default function BlogPage() {
    return (
        <div className="py-8">
            <div className="container-custom">
                {/* 헤더 */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        📚 유용한 가이드
                    </h1>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto">
                        정부 지원금, 금융 상품, 부동산 정보 등
                        실생활에 도움이 되는 정보를 제공합니다.
                    </p>
                </div>

                {/* 블로그 목록 */}
                <div className="max-w-4xl mx-auto">
                    <div className="grid gap-6">
                        {blogPosts.map((post) => (
                            <article key={post.slug} className="card p-6 hover:shadow-lg transition-shadow">
                                <Link href={`/blog/${post.slug}`} className="flex gap-4" prefetch={false}>
                                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-3xl">{post.emoji}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[post.category] || "bg-gray-100 text-gray-800"}`}>
                                                {post.category}
                                            </span>
                                            <span className="text-xs text-text-light">{post.date}</span>
                                        </div>
                                        <h2 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-text-muted text-sm line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <p className="text-text-muted mb-4">
                        지금 바로 나에게 맞는 지원금을 찾아보세요
                    </p>
                    <Link href="/calculators/youth-subsidy" className="btn-primary">
                        🎯 지원금 계산기 이용하기
                    </Link>
                </div>
            </div>
        </div>
    );
}
