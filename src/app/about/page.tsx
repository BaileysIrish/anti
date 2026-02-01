import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "서비스 소개",
    description: "복지혜택 찾기는 정부 지원금과 복지 혜택 정보를 제공하는 무료 서비스입니다.",
};

export default function AboutPage() {
    return (
        <div className="py-12">
            <div className="container-custom max-w-3xl">
                <h1 className="text-3xl font-bold mb-8">서비스 소개</h1>

                <div className="prose prose-lg text-text-muted">
                    <div className="card p-8 mb-8 text-center">
                        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl text-white font-bold">복</span>
                        </div>
                        <h2 className="text-2xl font-bold text-text mb-2">복지혜택 찾기</h2>
                        <p className="text-lg">
                            나에게 맞는 정부 지원금을 쉽고 빠르게 찾아주는 서비스
                        </p>
                    </div>

                    <h2 className="text-xl font-bold mt-8 mb-4 text-text">🎯 서비스 목적</h2>
                    <p>
                        많은 분들이 자신이 받을 수 있는 정부 지원금이 있다는 사실을 모르거나,
                        복잡한 자격 조건과 신청 절차 때문에 포기하고 있습니다.
                    </p>
                    <p>
                        <strong>복지혜택 찾기</strong>는 이런 문제를 해결하기 위해 만들어졌습니다.
                        간단한 정보 입력만으로 받을 수 있는 지원금을 한눈에 확인하고,
                        신청까지 연결해드립니다.
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4 text-text">✨ 주요 기능</h2>
                    <div className="grid gap-4 mt-4">
                        <div className="card p-4 flex gap-4 items-start">
                            <div className="text-2xl">💰</div>
                            <div>
                                <h3 className="font-bold text-text">청년 지원금 계산기</h3>
                                <p className="text-sm">나이, 소득, 거주지 기반 맞춤 지원금 추천</p>
                            </div>
                        </div>
                        <div className="card p-4 flex gap-4 items-start">
                            <div className="text-2xl">💱</div>
                            <div>
                                <h3 className="font-bold text-text">환율 계산기</h3>
                                <p className="text-sm">실시간 환율 정보 기반 원화↔외화 변환</p>
                            </div>
                        </div>
                        <div className="card p-4 flex gap-4 items-start">
                            <div className="text-2xl">🏠</div>
                            <div>
                                <h3 className="font-bold text-text">부동산 시세 조회</h3>
                                <p className="text-sm">국토부 실거래가 데이터 기반 시세 정보</p>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold mt-8 mb-4 text-text">📊 데이터 출처</h2>
                    <p>
                        서비스에서 제공하는 정보는 다음 공식 기관의 공공데이터를 기반으로 합니다:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>정부24 공공서비스 API</li>
                        <li>복지로 복지서비스 정보</li>
                        <li>한국은행 경제통계 API</li>
                        <li>국토교통부 실거래가 API</li>
                    </ul>
                    <p className="mt-4 text-sm bg-blue-50 p-4 rounded-lg">
                        ℹ️ 공공데이터는 「공공데이터법」에 따라 상업적 활용이 허용됩니다.
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4 text-text">📧 문의하기</h2>
                    <p>
                        서비스 이용 중 문의사항이 있으시면 아래로 연락해 주세요.
                    </p>
                    <ul className="list-disc pl-6 mt-2">
                        <li>이메일: official.contact.hq@gmail.com</li>
                    </ul>

                    <div className="mt-8 text-center">
                        <Link href="/calculators/youth-subsidy" className="btn-primary inline-block">
                            🎯 지원금 찾으러 가기
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
