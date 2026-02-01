import Link from "@/components/common/Link";

const footerLinks = {
    services: [
        { name: "청년 지원금 계산기", href: "/calculators/youth-subsidy" },
        { name: "환율 계산기", href: "/calculators/exchange-rate" },
        { name: "부동산 시세", href: "/calculators/real-estate" },
    ],
    company: [
        { name: "소개", href: "/about" },
        { name: "블로그", href: "/blog" },
        { name: "자주 묻는 질문 (FAQ)", href: "/faq" },
        { name: "문의하기", href: "/contact" },
    ],
    legal: [
        { name: "개인정보처리방침", href: "/privacy" },
        { name: "이용약관", href: "/terms" },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* 브랜드 */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">복</span>
                            </div>
                            <span className="font-bold text-xl">복지혜택 찾기</span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            나에게 맞는 정부 지원금과 복지 혜택을 한눈에 찾아보세요.
                            2026년 최신 정보를 제공합니다.
                        </p>
                    </div>

                    {/* 서비스 */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">서비스</h3>
                        <ul className="space-y-2">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 회사 */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">정보</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 법적 고지 */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">법적 고지</h3>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 하단 광고 영역 */}
                <div className="mt-8 pt-8 border-t border-slate-800">
                    <div className="ad-placeholder h-20 bg-slate-800 border-slate-700 mb-6">
                        <span>광고 영역 (728x90)</span>
                    </div>
                </div>

                {/* 저작권 */}
                <div className="border-t border-slate-800 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                        <p>© 2026 복지혜택 찾기. All rights reserved.</p>
                        <p className="mt-2 md:mt-0">
                            본 서비스는 정보 제공 목적이며, 정확한 내용은 해당 기관에 문의하세요.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
