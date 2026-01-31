import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdPlaceholder from "@/components/ads/AdPlaceholder";

export const runtime = "edge";
export const dynamicParams = false;

// 블로그 포스트 데이터
const blogPostsData: Record<string, {
    title: string;
    description: string;
    category: string;
    date: string;
    content: React.ReactNode;
}> = {
    "youth-subsidy-guide-2026": {
        title: "2026년 청년 지원금 총정리 - 놓치면 손해!",
        description: "청년도약계좌, 청년내일저축계좌, 청년월세지원금 등 2026년 받을 수 있는 모든 지원금을 정리했습니다.",
        category: "지원금",
        date: "2026.01.30",
        content: (
            <>
                <p>2026년에도 청년들을 위한 다양한 정부 지원금이 마련되어 있습니다. 하지만 많은 분들이 자신이 받을 수 있는 혜택을 모르고 지나치는 경우가 많습니다. 이 글에서는 2026년 현재 신청 가능한 주요 청년 지원금을 총정리해 드립니다.</p>

                <h2>💰 청년도약계좌</h2>
                <p>만 19~34세 청년이 월 최대 70만원을 5년간 저축하면 정부가 매칭 지원금을 더해주는 장기 저축 상품입니다. 소득에 따라 월 최대 24,000원의 정부기여금을 받을 수 있으며, 5년 만기 시 약 5,000만원 이상의 목돈을 마련할 수 있습니다.</p>
                <ul>
                    <li><strong>대상:</strong> 만 19~34세, 월 소득 600만원 이하</li>
                    <li><strong>혜택:</strong> 월 최대 24,000원 정부기여금</li>
                    <li><strong>신청:</strong> 시중 은행 및 인터넷뱅킹</li>
                </ul>

                <h2>💰 청년내일저축계좌</h2>
                <p>저소득 청년을 위한 자산형성 지원 제도입니다. 3년간 매월 10만원을 저축하면 정부가 최대 30만원까지 매칭해주어, 만기 시 최대 1,440만원의 목돈을 마련할 수 있습니다.</p>
                <ul>
                    <li><strong>대상:</strong> 만 19~34세, 월 소득 250만원 이하</li>
                    <li><strong>혜택:</strong> 최대 1,440만원 (3년)</li>
                    <li><strong>신청:</strong> 복지로 (www.bokjiro.go.kr)</li>
                </ul>

                <h2>🏠 청년월세지원</h2>
                <p>독립 거주 청년의 주거비 부담을 줄이기 위한 정책입니다. 월 최대 20만원씩 최대 12개월간 지원받을 수 있어, 1년에 최대 240만원의 실질적인 주거비 지원을 받습니다.</p>
                <ul>
                    <li><strong>대상:</strong> 만 19~34세, 월세 60만원 이하 거주</li>
                    <li><strong>혜택:</strong> 월 최대 20만원 (최대 12개월)</li>
                    <li><strong>신청:</strong> 정부24 (www.gov.kr)</li>
                </ul>

                <h2>📋 신청 전 체크리스트</h2>
                <ol>
                    <li>각 지원금별 소득 기준 확인 (세전/세후 구분)</li>
                    <li>중복 수혜 가능 여부 확인</li>
                    <li>필요 서류 미리 준비 (소득증빙, 주민등록등본 등)</li>
                    <li>신청 기간 확인 및 알림 설정</li>
                </ol>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
                    <p className="font-bold text-blue-800 mb-2">💡 꿀팁</p>
                    <p className="text-blue-700">나에게 맞는 지원금이 무엇인지 헷갈린다면, 저희 사이트의 <Link href="/calculators/youth-subsidy" className="underline font-semibold">청년 지원금 계산기</Link>를 이용해 보세요. 나이, 소득, 거주지를 입력하면 받을 수 있는 지원금을 한눈에 확인할 수 있습니다.</p>
                </div>
            </>
        ),
    },
    "subsidy-application-tips": {
        title: "지원금 신청 성공 꿀팁 - 한 번에 통과하는 방법",
        description: "서류 준비부터 신청까지, 탈락 없이 지원금을 받기 위한 핵심 노하우를 공개합니다.",
        category: "가이드",
        date: "2026.01.28",
        content: (
            <>
                <p>정부 지원금 신청, 어렵게 느껴지시나요? 서류 미비로 반려되거나, 자격 조건을 잘못 이해해서 거절당하는 경우가 많습니다. 이 글에서는 한 번에 지원금 신청에 성공하는 핵심 노하우를 알려드립니다.</p>

                <h2>📋 1. 자격 조건 꼼꼼히 확인하기</h2>
                <p>가장 흔한 실수는 자격 조건을 제대로 확인하지 않는 것입니다.</p>
                <ul>
                    <li><strong>소득 기준:</strong> "월 소득"이 세전인지 세후인지 확인하세요.</li>
                    <li><strong>나이 기준:</strong> "만 나이"인지 "연 나이"인지 구분하세요.</li>
                    <li><strong>거주 기간:</strong> 일부 지원금은 해당 지역 거주 기간 조건이 있습니다.</li>
                </ul>

                <h2>📁 2. 서류 미리 준비하기</h2>
                <p>대부분의 지원금 신청에 필요한 공통 서류입니다:</p>
                <ul>
                    <li>주민등록등본 (주민센터 또는 정부24에서 발급)</li>
                    <li>소득금액증명원 (홈택스에서 발급)</li>
                    <li>건강보험자격득실확인서 (국민건강보험공단에서 발급)</li>
                    <li>근로소득원천징수영수증 (회사에서 발급)</li>
                </ul>

                <h2>⏰ 3. 신청 기간 놓치지 않기</h2>
                <p>많은 지원금이 정해진 기간에만 신청을 받습니다. 놓치면 다음 차수까지 기다려야 합니다.</p>
                <ul>
                    <li>정부24, 복지로 앱에서 알림 설정하기</li>
                    <li>캘린더에 신청 시작일 미리 등록하기</li>
                    <li>신청 첫날 바로 접수하기 (선착순 마감 방지)</li>
                </ul>

                <h2>✅ 4. 신청서 작성 팁</h2>
                <ol>
                    <li>모든 칸을 빠짐없이 채우기</li>
                    <li>숫자는 정확하게 입력하기 (소득, 금액 등)</li>
                    <li>첨부파일 용량과 형식 확인하기</li>
                    <li>제출 전 미리보기로 최종 확인하기</li>
                </ol>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-6">
                    <p className="font-bold text-amber-800 mb-2">⚠️ 주의사항</p>
                    <p className="text-amber-700">허위 정보 기재 시 지원금 환수는 물론 향후 신청 자격이 박탈될 수 있습니다. 반드시 정확한 정보만 입력하세요.</p>
                </div>
            </>
        ),
    },
    "exchange-rate-saving-tips": {
        title: "환전 수수료 90% 아끼는 방법",
        description: "해외여행, 유학, 해외직구 시 환전 우대율 받는 꿀팁을 알려드립니다.",
        category: "금융",
        date: "2026.01.25",
        content: (
            <>
                <p>해외여행이나 유학을 준비할 때, 환전 수수료를 얼마나 내고 계신가요? 은행 창구에서 그냥 환전하면 수수료를 많이 내게 됩니다. 조금만 신경 쓰면 환전 수수료의 최대 90%까지 아낄 수 있습니다!</p>

                <h2>💱 1. 인터넷/모바일뱅킹 환전하기</h2>
                <p>은행 창구보다 인터넷뱅킹이나 모바일뱅킹으로 환전하면 훨씬 유리합니다.</p>
                <ul>
                    <li>창구 환전: 우대율 0~30%</li>
                    <li>인터넷뱅킹: 우대율 50~70%</li>
                    <li>모바일뱅킹: 우대율 70~90%</li>
                </ul>

                <h2>📱 2. 환전 전용 앱 활용하기</h2>
                <p>토스, 카카오뱅크, 케이뱅크 등 핀테크 앱에서는 기본 우대율이 높습니다. 특히 이벤트 기간에는 100% 우대(수수료 0원)도 가능합니다.</p>

                <h2>⏰ 3. 환율 좋은 타이밍 노리기</h2>
                <ul>
                    <li>평일 오전 9~11시: 첫 고시 환율 적용</li>
                    <li>주말/공휴일 피하기: 불리한 환율 적용</li>
                    <li>환율 알림 서비스 활용: 목표 환율 도달 시 알림</li>
                </ul>

                <h2>💳 4. 해외결제 시 팁</h2>
                <p>해외직구나 해외결제 시 <strong>"원화결제(DCC)"를 절대 선택하지 마세요!</strong> 가맹점이 정한 불리한 환율이 적용됩니다. 반드시 <strong>"현지통화결제"</strong>를 선택하세요.</p>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-6">
                    <p className="font-bold text-green-800 mb-2">💡 실전 예시</p>
                    <p className="text-green-700">1,000달러 환전 시:<br />
                        • 창구(우대 0%): 약 1,364,000원<br />
                        • 모바일(우대 90%): 약 1,351,400원<br />
                        → <strong>약 12,600원 절약!</strong></p>
                </div>

                <p>저희 <Link href="/calculators/exchange-rate" className="text-primary underline font-semibold">환율 계산기</Link>를 활용하면 현재 환율로 정확한 환전 금액을 미리 계산해볼 수 있습니다.</p>
            </>
        ),
    },
    "unclaimed-money-search": {
        title: "내 돈 찾아가세요 - 미수령 환급금 조회 방법",
        description: "건강보험료, 국세, 지방세 등 미수령 환급금을 한 번에 조회하는 방법을 알려드립니다.",
        category: "환급금",
        date: "2026.01.22",
        content: (
            <>
                <p>혹시 내가 모르는 사이에 돌려받아야 할 돈이 있다면? 생각보다 많은 분들이 미수령 환급금을 찾아가지 않고 있습니다. 지금 바로 확인해보세요!</p>

                <h2>🔍 미수령 환급금 종류</h2>
                <ul>
                    <li><strong>건강보험료 과납금:</strong> 이직, 퇴직 시 발생한 과납금</li>
                    <li><strong>국세 환급금:</strong> 연말정산, 종합소득세 과납분</li>
                    <li><strong>지방세 환급금:</strong> 자동차세, 재산세 과납분</li>
                    <li><strong>통신요금 미환급금:</strong> 해지 후 남은 요금</li>
                    <li><strong>보험금 미청구:</strong> 실손보험 등 청구하지 않은 보험금</li>
                </ul>

                <h2>📱 조회 방법</h2>

                <h3>1. 정부24 통합 조회</h3>
                <p><a href="https://www.gov.kr" target="_blank" rel="noopener" className="text-primary underline">정부24 (www.gov.kr)</a> → 미환급금 찾기 → 본인인증 → 한 번에 조회</p>

                <h3>2. 건강보험료 환급금</h3>
                <p><a href="https://www.nhis.or.kr" target="_blank" rel="noopener" className="text-primary underline">국민건강보험공단 (www.nhis.or.kr)</a> → 보험료 조회 → 환급금 확인</p>

                <h3>3. 국세 환급금</h3>
                <p><a href="https://www.hometax.go.kr" target="_blank" rel="noopener" className="text-primary underline">홈택스 (www.hometax.go.kr)</a> → My홈택스 → 환급금 조회</p>

                <h3>4. 지방세 환급금</h3>
                <p><a href="https://www.wetax.go.kr" target="_blank" rel="noopener" className="text-primary underline">위택스 (www.wetax.go.kr)</a> → 환급금 조회</p>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
                    <p className="font-bold text-blue-800 mb-2">💰 평균 환급 금액</p>
                    <p className="text-blue-700">미수령 환급금의 건당 평균 금액은 약 5~10만원입니다. 여러 기관에 나눠져 있는 경우도 많으니, 모든 채널을 꼭 확인해보세요!</p>
                </div>

                <h2>⚠️ 주의사항</h2>
                <ul>
                    <li>환급금은 5년이 지나면 국고로 귀속됩니다. 빨리 확인하세요!</li>
                    <li>조회 시 본인인증(공동인증서, 간편인증)이 필요합니다.</li>
                    <li>사칭 사이트 주의! 반드시 공식 사이트(.go.kr)에서만 조회하세요.</li>
                </ul>
            </>
        ),
    },
    "first-home-loan-guide": {
        title: "2026년 청년 전세/주택 대출 완벽 가이드",
        description: "버팀목 전세대출, 디딤돌 대출 등 청년을 위한 주거 지원 대출을 비교 분석합니다.",
        category: "부동산",
        date: "2026.01.20",
        content: (
            <>
                <p>내 집 마련의 첫 걸음, 전세나 주택 구입을 위한 대출! 청년을 위한 저금리 대출 상품을 알아보고 나에게 맞는 상품을 선택하세요.</p>

                <h2>🏠 청년 전용 버팀목 전세자금대출</h2>
                <p>무주택 청년을 위한 대표적인 저금리 전세 대출 상품입니다.</p>
                <ul>
                    <li><strong>대상:</strong> 만 19~34세 무주택 세대주</li>
                    <li><strong>금리:</strong> 연 1.8% ~ 2.4%</li>
                    <li><strong>한도:</strong> 수도권 최대 1.2억원, 지방 최대 8천만원</li>
                    <li><strong>기간:</strong> 최대 2년 (4회 연장 가능, 최대 10년)</li>
                </ul>

                <h2>🏡 디딤돌 대출 (주택구입)</h2>
                <p>생애 첫 주택 구입을 위한 정부 지원 대출입니다.</p>
                <ul>
                    <li><strong>대상:</strong> 무주택 세대주, 부부합산 연소득 6천만원 이하</li>
                    <li><strong>금리:</strong> 연 2.15% ~ 3.0%</li>
                    <li><strong>한도:</strong> 최대 2.5억원</li>
                    <li><strong>기간:</strong> 10년, 15년, 20년, 30년</li>
                </ul>

                <h2>📊 상품 비교</h2>
                <table className="w-full border-collapse border border-gray-300 my-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">구분</th>
                            <th className="border border-gray-300 p-2">버팀목</th>
                            <th className="border border-gray-300 p-2">디딤돌</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 p-2">용도</td>
                            <td className="border border-gray-300 p-2">전세자금</td>
                            <td className="border border-gray-300 p-2">주택구입</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2">금리</td>
                            <td className="border border-gray-300 p-2">1.8~2.4%</td>
                            <td className="border border-gray-300 p-2">2.15~3.0%</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2">신청처</td>
                            <td className="border border-gray-300 p-2">주택도시기금</td>
                            <td className="border border-gray-300 p-2">주택도시기금</td>
                        </tr>
                    </tbody>
                </table>

                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 my-6">
                    <p className="font-bold text-purple-800 mb-2">📌 신청 방법</p>
                    <p className="text-purple-700">주택도시기금 포털 (<a href="https://nhuf.molit.go.kr" target="_blank" rel="noopener" className="underline">nhuf.molit.go.kr</a>) 또는 기금 수탁은행(국민, 우리, 신한, 기업, 농협)에서 신청 가능합니다.</p>
                </div>
            </>
        ),
    },
    "savings-comparison-2026": {
        title: "2026년 고금리 적금 TOP 5 비교",
        description: "은행별 청년 우대 적금 상품을 금리, 조건, 우대 사항별로 비교했습니다.",
        category: "금융",
        date: "2026.01.18",
        content: (
            <>
                <p>저금리 시대에도 높은 금리를 받을 수 있는 적금 상품이 있습니다! 특히 청년 우대 적금은 일반 적금보다 훨씬 유리한 조건을 제공합니다.</p>

                <h2>🏆 2026년 추천 적금 TOP 5</h2>

                <h3>1. 청년도약계좌 (정부 지원)</h3>
                <ul>
                    <li><strong>금리:</strong> 기본 4.5% + 정부기여금</li>
                    <li><strong>기간:</strong> 5년</li>
                    <li><strong>한도:</strong> 월 70만원</li>
                    <li><strong>특징:</strong> 정부가 추가 지원금 제공</li>
                </ul>

                <h3>2. 카카오뱅크 청년 적금</h3>
                <ul>
                    <li><strong>금리:</strong> 최대 5.0%</li>
                    <li><strong>기간:</strong> 1년</li>
                    <li><strong>한도:</strong> 월 50만원</li>
                    <li><strong>특징:</strong> 가입 간편, 우대조건 쉬움</li>
                </ul>

                <h3>3. 토스뱅크 먼저 이자 받는 적금</h3>
                <ul>
                    <li><strong>금리:</strong> 최대 4.5%</li>
                    <li><strong>기간:</strong> 6개월</li>
                    <li><strong>한도:</strong> 월 300만원</li>
                    <li><strong>특징:</strong> 이자 먼저 지급</li>
                </ul>

                <h3>4. 케이뱅크 청년 희망 적금</h3>
                <ul>
                    <li><strong>금리:</strong> 최대 4.8%</li>
                    <li><strong>기간:</strong> 1년</li>
                    <li><strong>한도:</strong> 월 50만원</li>
                    <li><strong>특징:</strong> 급여이체 시 우대</li>
                </ul>

                <h3>5. 신한은행 청년 우대 적금</h3>
                <ul>
                    <li><strong>금리:</strong> 최대 4.5%</li>
                    <li><strong>기간:</strong> 1년</li>
                    <li><strong>한도:</strong> 월 30만원</li>
                    <li><strong>특징:</strong> 대면/비대면 모두 가입 가능</li>
                </ul>

                <h2>💡 적금 선택 팁</h2>
                <ol>
                    <li>우대금리 조건 달성 가능 여부 확인</li>
                    <li>중도해지 시 금리 확인</li>
                    <li>자동이체 가능 여부 확인</li>
                    <li>비과세/세금우대 적용 여부 확인</li>
                </ol>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-6">
                    <p className="font-bold text-green-800 mb-2">🎯 추천 조합</p>
                    <p className="text-green-700">청년도약계좌(정부 지원) + 단기 고금리 적금(카카오/토스뱅크)을 함께 가입하면 자산 형성 속도를 높일 수 있습니다!</p>
                </div>
            </>
        ),
    },
};

// 정적 생성을 위한 경로 생성
export async function generateStaticParams() {
    return Object.keys(blogPostsData).map((slug) => ({
        slug,
    }));
}

// 동적 메타데이터 생성
export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPostsData[slug];

    if (!post) {
        return { title: "게시글을 찾을 수 없습니다" };
    }

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
        },
    };
}

export default async function BlogPostPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const post = blogPostsData[slug];

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* 프리미엄 헤더 배경 */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-10 bg-opacity-90 backdrop-blur-md">
                <div className="container-custom py-4">
                    <Link href="/blog" className="flex items-center text-text-muted hover:text-primary transition-colors font-medium">
                        ← 블로그 목록
                    </Link>
                </div>
            </div>

            <div className="container-custom max-w-4xl py-12">
                {/* 아티클 헤더 */}
                <div className="text-center mb-12">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6 shadow-sm border ${post.category === "지원금" ? "bg-blue-50 text-blue-700 border-blue-100" :
                        post.category === "가이드" ? "bg-green-50 text-green-700 border-green-100" :
                            post.category === "금융" ? "bg-purple-50 text-purple-700 border-purple-100" :
                                post.category === "환급금" ? "bg-amber-50 text-amber-700 border-amber-100" :
                                    "bg-pink-50 text-pink-700 border-pink-100"
                        }`}>
                        {post.category}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-slate-900 tracking-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-text-muted text-sm">
                        <span>{post.date}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>금융정보팀</span>
                    </div>
                </div>

                {/* 상단 광고 */}
                <div className="mb-12">
                    <AdPlaceholder variant="header" />
                </div>

                {/* 본문 콘텐츠 */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                    <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:text-slate-600 prose-strong:text-slate-900 prose-img:rounded-xl">
                        {post.content}
                    </article>

                    {/* 면책 고지 (사용자 요청) */}
                    <div className="mt-16 p-6 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-500 leading-relaxed">
                        <div className="flex items-start gap-3">
                            <span className="text-xl">⚖️</span>
                            <div>
                                <p className="font-semibold text-gray-700 mb-1">면책 고지</p>
                                <p>본 콘텐츠는 작성일 기준의 일반적인 정보를 바탕으로 작성되었으며, 정부 정책 변경 및 시기에 따라 실제 내용과 다를 수 있습니다. 정확한 최신 정보는 반드시 관련 정부 기관 및 공식 사이트(정부24, 복지로 등)를 통해 다시 한번 확인하시기 바랍니다. 본 웹사이트의 정보 활용에 따른 법적 책임은 사용자 본인에게 있습니다.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 중간 광고 */}
                <div className="my-12">
                    <AdPlaceholder variant="inline" />
                </div>

                {/* 관련 추천 글 */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-slate-900">📚 이 글과 관련된 추천 정보</h3>
                        <Link href="/blog" className="text-sm font-semibold text-primary hover:text-primary-dark">
                            전체보기 →
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {Object.entries(blogPostsData)
                            .filter(([key]) => key !== slug)
                            .slice(0, 2)
                            .map(([key, relatedPost]) => (
                                <Link key={key} href={`/blog/${key}`} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-primary/20 transition-all duration-300">
                                    <div className="p-6">
                                        <span className="text-xs font-bold text-primary mb-2 block">{relatedPost.category}</span>
                                        <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                            {relatedPost.title}
                                        </h4>
                                        <p className="text-sm text-text-muted line-clamp-2">
                                            {relatedPost.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </section>

                {/* 하단 CTA */}
                <div className="mt-16 bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-10 text-center text-white shadow-xl relative overflow-hidden">
                    {/* SVG 패턴은 파일로 따로 없으므로 CSS나 간단한 요소로 대체 */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[length:20px_20px]"></div>
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">내 지원금, 아직도 모르시나요?</h2>
                        <p className="text-primary-100 mb-8 max-w-xl mx-auto text-lg">
                            간단한 정보 입력만으로 2026년 내가 받을 수 있는 정부 지원금을 한 번에 계산해 드립니다.
                        </p>
                        <Link href="/calculators/youth-subsidy" className="inline-block bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-lg transform hover:-translate-y-1">
                            💰 내 지원금 조회하기
                        </Link>
                    </div>
                </div>

                {/* 하단 광고 */}
                <div className="mt-12">
                    <AdPlaceholder variant="footer" />
                </div>
            </div>
        </div>
    );
}
