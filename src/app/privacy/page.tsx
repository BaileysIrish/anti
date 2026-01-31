import { Metadata } from "next";

export const metadata: Metadata = {
    title: "개인정보처리방침",
    description: "복지혜택 찾기 서비스의 개인정보처리방침입니다.",
};

export default function PrivacyPage() {
    return (
        <div className="py-12">
            <div className="container-custom max-w-3xl">
                <h1 className="text-3xl font-bold mb-8">개인정보처리방침</h1>

                <div className="prose prose-lg text-text-muted">
                    <p className="mb-6">
                        <strong>복지혜택 찾기</strong>(이하 "서비스")는 이용자의 개인정보를 중요시하며,
                        「개인정보 보호법」을 준수하고 있습니다.
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4 text-text">1. 수집하는 개인정보 항목</h2>
                    <p>
                        서비스는 계산기 기능 제공을 위해 다음 정보를 <strong>일시적으로</strong> 처리합니다:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>나이</li>
                        <li>월 소득 범위</li>
                        <li>거주 지역</li>
                        <li>취업 상태</li>
                    </ul>
                    <p className="mt-4">
                        <em>※ 위 정보는 계산 결과 제공 목적으로만 사용되며, 서버에 저장되지 않습니다.</em>
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4 text-text">2. 개인정보의 수집 목적</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>정부 지원금 자격 요건 계산</li>
                        <li>맞춤형 지원금 정보 제공</li>
                        <li>서비스 이용 통계 분석 (비식별화된 데이터)</li>
                    </ul>

                    <h2 className="text-xl font-bold mt-8 mb-4 text-text">3. 개인정보의 보유 및 이용 기간</h2>
                    <p>
                        서비스는 입력된 정보를 서버에 저장하지 않습니다.
                        모든 계산은 사용자의 브라우저에서 처리되며, 페이지를 벗어나면 정보가 삭제됩니다.
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4 text-text">4. 쿠키 및 광고</h2>
                    <p>
                        서비스는 Google 애드센스를 통해 광고를 게재합니다.
                        Google은 사용자의 관심사에 기반한 광고 제공을 위해 쿠키를 사용할 수 있습니다.
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                            <a href="https://policies.google.com/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline">
                                Google 개인정보처리방침
                            </a>
                        </li>
                        <li>
                            <a href="https://www.google.com/settings/ads"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline">
                                Google 광고 설정
                            </a>
                        </li>
                    </ul>

                    <h2 className="text-xl font-bold mt-8 mb-4 text-text">5. 개인정보 보호책임자</h2>
                    <p>
                        개인정보 관련 문의사항은 아래 연락처로 문의해 주세요.
                    </p>
                    <ul className="list-disc pl-6 mt-2">
                        <li>이메일: privacy@example.com</li>
                    </ul>

                    <h2 className="text-xl font-bold mt-8 mb-4 text-text">6. 개인정보처리방침 변경</h2>
                    <p>
                        본 방침이 변경되는 경우 시행일로부터 7일 전 공지사항을 통해 고지합니다.
                    </p>

                    <p className="mt-8 text-sm">
                        <strong>시행일:</strong> 2026년 1월 1일
                    </p>
                </div>
            </div>
        </div>
    );
}
