import type { Metadata } from "next";
import Link from "@/components/common/Link";

export const metadata: Metadata = {
    title: "편집정책 및 수정이력",
    description: "복지혜택 찾기의 콘텐츠 편집 기준, 출처 검증 절차, 이해상충/광고 표기 원칙, 수정 이력을 안내합니다.",
    alternates: {
        canonical: "/editorial-policy",
    },
};

export default function EditorialPolicyPage() {
    return (
        <div className="py-12">
            <div className="container-custom max-w-4xl">
                <h1 className="text-3xl font-bold mb-8">편집정책 및 수정이력</h1>

                <div className="prose prose-lg max-w-none text-text-muted">
                    <p>
                        본 페이지는 콘텐츠 신뢰성을 높이기 위해 복지혜택 찾기의 편집 기준과 수정 이력을 공개합니다.
                        본 서비스는 정보 제공 목적이며, 최종 신청 기준은 각 기관의 최신 공고문과 안내문을 우선합니다.
                    </p>

                    <h2>1. 편집 원칙</h2>
                    <ul>
                        <li>공식 기관 원문을 우선 확인한 뒤 요약·비교 콘텐츠를 작성합니다.</li>
                        <li>자격 조건, 신청 기간, 중복 수혜 조건은 표 형태로 명확히 구분합니다.</li>
                        <li>추정/해석이 포함된 문장은 사실 정보와 분리해 표시합니다.</li>
                        <li>각 문서에 작성일, 최종 검토일, 출처를 함께 표기합니다.</li>
                    </ul>

                    <h2>2. 출처 검증 단계</h2>
                    <ol>
                        <li>정부24, 복지로, 고용24, 금융감독원 등 1차 출처 확인</li>
                        <li>최신 공고일과 시행일 비교, 구버전 문서 여부 확인</li>
                        <li>중복 수혜/예외 조항/증빙 문서 항목 교차 검토</li>
                        <li>게시 전 내부 체크리스트 재확인 후 발행</li>
                    </ol>

                    <h2>3. 이해상충 및 광고 표기</h2>
                    <ul>
                        <li>광고 노출 여부와 관계없이 편집 우선순위는 정보 완결성을 기준으로 결정합니다.</li>
                        <li>대가성 제휴가 포함된 경우 페이지 내에서 명시합니다.</li>
                        <li>특정 금융상품 가입 유도형 표현은 지양하고, 비교 기준 중심으로 설명합니다.</li>
                    </ul>

                    <h2>4. 오류 수정 및 업데이트 정책</h2>
                    <ul>
                        <li>정책성 문서는 월 1회 정기 점검합니다.</li>
                        <li>중요 정책 변경 또는 오류 제보가 확인되면 우선 수정합니다.</li>
                        <li>의미 있는 수정은 아래 수정 이력 표에 기록합니다.</li>
                    </ul>

                    <h2>5. 작성자/검수 책임 주체</h2>
                    <p>
                        발행 주체와 검수 담당은 <Link href="/authors" className="text-primary hover:underline">작성자 페이지</Link>에서 공개합니다. 모든 인덱싱 허용 글은
                        작성자, 최종 검토일, 최종 수정일, 출처를 함께 표기하는 것을 원칙으로 합니다.
                    </p>

                    <h2>6. 수정 이력</h2>
                    <div className="overflow-x-auto not-prose">
                        <table className="w-full border border-gray-200 rounded-xl text-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="text-left px-4 py-3 border-b border-gray-200">수정일</th>
                                    <th className="text-left px-4 py-3 border-b border-gray-200">대상</th>
                                    <th className="text-left px-4 py-3 border-b border-gray-200">수정 내용</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-3 border-b border-gray-100">2026-02-19</td>
                                    <td className="px-4 py-3 border-b border-gray-100">작성자/품질 메타</td>
                                    <td className="px-4 py-3 border-b border-gray-100">
                                        작성자 페이지 신설, 블로그 메타데이터 확장(updatedAt/authorId/qualitySignals), 사이트맵 반영
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 border-b border-gray-100">2026-02-19</td>
                                    <td className="px-4 py-3 border-b border-gray-100">신규 심층 가이드 4건</td>
                                    <td className="px-4 py-3 border-b border-gray-100">
                                        이의신청 절차, 월세 증빙 실패패턴, 대출 심사 타임라인, 중복수혜 의사결정 가이드 추가
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 border-b border-gray-100">2026-02-19</td>
                                    <td className="px-4 py-3 border-b border-gray-100">블로그/탐색 구조</td>
                                    <td className="px-4 py-3 border-b border-gray-100">
                                        저가치 판단 가능성이 있는 게시글 정리, 내부 링크 및 메뉴 구조 재정비
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 border-b border-gray-100">2026-02-19</td>
                                    <td className="px-4 py-3 border-b border-gray-100">신규 가이드 2건</td>
                                    <td className="px-4 py-3 border-b border-gray-100">
                                        지원금 심사 탈락 사유 및 서류 체크리스트 심층 콘텐츠 추가
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3">2026-02-19</td>
                                    <td className="px-4 py-3">정책 페이지</td>
                                    <td className="px-4 py-3">
                                        편집정책/수정이력 페이지 신설 및 푸터 링크 공개
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2>7. 문의</h2>
                    <p>
                        콘텐츠 오류 또는 출처 보완이 필요한 경우 아래 이메일로 알려주세요.
                    </p>
                    <p>
                        이메일: <a href="mailto:official.contact.hq@gmail.com">official.contact.hq@gmail.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
