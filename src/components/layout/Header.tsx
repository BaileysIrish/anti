"use client";

import Link from "next/link";
import { useState } from "react";

const navigation = [
    { name: "홈", href: "/" },
    { name: "지원금 계산기", href: "/calculators/youth-subsidy" },
    { name: "환율 계산기", href: "/calculators/exchange-rate" },
    { name: "부동산 시세", href: "/calculators/real-estate" },
    { name: "블로그", href: "/blog" },
    { name: "FAQ", href: "/faq" },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-surface border-b border-border sticky top-0 z-50">
            <nav className="container-custom">
                <div className="flex items-center justify-between h-16">
                    {/* 로고 */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">복</span>
                        </div>
                        <span className="font-bold text-xl text-text">복지혜택 찾기</span>
                    </Link>

                    {/* 데스크톱 네비게이션 */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-text-muted hover:text-primary font-medium transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA 버튼 */}
                    <div className="hidden md:block">
                        <Link href="/calculators/youth-subsidy" className="btn-primary text-sm">
                            지원금 찾기
                        </Link>
                    </div>

                    {/* 모바일 메뉴 버튼 */}
                    <button
                        type="button"
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="메뉴 열기"
                    >
                        <svg
                            className="w-6 h-6 text-text"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {mobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* 모바일 메뉴 */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <div className="flex flex-col space-y-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-text-muted hover:text-primary font-medium px-2 py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                href="/calculators/youth-subsidy"
                                className="btn-primary text-center"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                지원금 찾기
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* 상단 광고 영역 (선택적) */}
            {/* <AdPlaceholder variant="header" /> */}
        </header>
    );
}
