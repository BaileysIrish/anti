import AdPlaceholder from "@/components/ads/AdPlaceholder";

export const metadata = {
    title: "자주 묻는 질문 (FAQ) | 금융 가이드",
    description: "환율 계산, 정부 지원금, 금융 상식 등 자주 묻는 질문에 대한 답변을 확인하세요.",
};

export default function FAQPage() {
    const faqs = [
        {
            category: "환율/환전",
            question: "환율 정보는 얼마나 자주 갱신되나요?",
            answer: "본 서비스는 한국수출입은행의 고시 환율을 실시간으로 반영합니다. 단, 주말 및 공휴일에는 금융시장이 휴장하므로 직전 영업일의 최종 고시 환율이 표시됩니다."
        },
        {
            category: "환율/환전",
            question: "표시되는 환율로 즉시 환전할 수 있나요?",
            answer: "제공되는 환율은 '매매기준율'을 포함한 참조용 정보입니다. 실제 은행에서 환전하실 때는 각 은행별 수수료(스프레드)와 우대율이 적용되어 실제 적용 환율은 다를 수 있습니다."
        },
        {
            category: "정부 지원금",
            question: "청년 지원금 신청은 어디서 하나요?",
            answer: "대부분의 정부 지원금은 '정부24' 또는 '복지로' 웹사이트에서 온라인으로 신청할 수 있습니다. 본 사이트의 청년 지원금 계산기를 통해 자격 요건을 먼저 확인하시고, 해당 기관으로 이동하여 신청하시는 것을 권장합니다."
        },
        {
            category: "정부 지원금",
            question: "지원금 자격 조건이 변경되었나요?",
            answer: "정부 지원 정책은 매년 예산과 정책 방향에 따라 변경될 수 있습니다. 본 사이트는 최신 공고를 바탕으로 정보를 제공하려고 노력하고 있으나, 정확한 최신 정보는 반드시 해당 사업의 공식 공고문을 확인하셔야 합니다."
        },
        {
            category: "사이트 이용",
            question: "모바일에서도 이용 가능한가요?",
            answer: "네, 본 사이트는 반응형 웹으로 제작되어 스마트폰, 태블릿, PC 등 모든 기기에서 최적화된 화면으로 이용하실 수 있습니다."
        },
        {
            category: "금융 상식",
            question: "숨은 돈 찾기는 어떤 서비스인가요?",
            answer: "휴면 예금, 미환급 보험금, 카드 포인트 등 잊고 있던 금융 자산을 한 번에 조회하고 찾을 수 있는 서비스입니다. 서민금융진흥원이나 금융결제원의 계좌정보통합관리서비스를 통해 조회 가능합니다."
        }
    ];

    return (
        <div className="container-custom py-12 md:py-20">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                        고객 지원
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900 leading-tight">
                        자주 묻는 질문
                    </h1>
                    <p className="text-text-muted text-lg">
                        사용자분들이 자주 궁금해하시는 내용을 정리했습니다.
                    </p>
                </div>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className="text-sm font-bold text-primary mb-2">
                                {faq.category}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                Q. {faq.question}
                            </h3>
                            <p className="text-text-muted leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">원하는 답변을 찾지 못하셨나요?</h3>
                    <p className="text-text-muted mb-6">
                        더 궁금한 점은 관련 정부 기관이나 금융기관 고객센터로 문의해 주시기 바랍니다.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="https://www.gov.kr/portal/main"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-semibold text-slate-700 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2"
                        >
                            🏛️ 정부24 바로가기
                        </a>
                        <a
                            href="https://www.koreaexim.go.kr/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-semibold text-slate-700 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2"
                        >
                            🏦 한국수출입은행
                        </a>
                    </div>
                </div>

                <div className="mt-12">
                    <AdPlaceholder variant="inline" />
                </div>
            </div>
        </div>
    );
}
