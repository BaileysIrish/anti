import Link from "@/components/common/Link";
import { Subsidy, categoryColors } from "@/lib/subsidies";


interface SubsidyResultProps {
    subsidies: Subsidy[];
    onReset: () => void;
}

export default function SubsidyResult({ subsidies, onReset }: SubsidyResultProps) {
    const totalCount = subsidies.length;

    return (
        <div>
            {/* 결과 요약 */}
            <div className="card p-6 md:p-8 mb-6 gradient-primary text-white">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <p className="text-blue-100 mb-1">나에게 맞는 지원금</p>
                        <h2 className="text-3xl font-bold">
                            총 {totalCount}개 발견! 🎉
                        </h2>
                    </div>
                    <button
                        onClick={onReset}
                        className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        다시 계산하기
                    </button>
                </div>
            </div>

            {/* 지원금 목록 */}
            <div className="space-y-4">
                {subsidies.map((subsidy) => (
                    <article key={subsidy.id} className="card p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${categoryColors[subsidy.category]} mb-2`}>
                                    {subsidy.category}
                                </span>
                                <h3 className="text-lg font-bold">{subsidy.name}</h3>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="text-xs text-text-muted">지원 금액</p>
                                <p className="font-bold text-primary">{subsidy.amount}</p>
                            </div>
                        </div>

                        <p className="text-text-muted mb-4">{subsidy.description}</p>

                        {/* 꿀팁 */}
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                            <p className="text-sm">
                                <span className="font-semibold text-amber-800">💡 꿀팁:</span>{" "}
                                <span className="text-amber-700">{subsidy.tips}</span>
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            {subsidy.deadline && (
                                <p className="text-sm text-text-muted">
                                    📅 신청 마감: {subsidy.deadline}
                                </p>
                            )}
                            <a
                                href={subsidy.applicationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline text-sm py-2"
                            >
                                신청하러 가기 →
                            </a>
                        </div>


                    </article>
                ))}
            </div>

            {/* 결과 없음 */}
            {totalCount === 0 && (
                <div className="card p-8 text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold mb-2">
                        조건에 맞는 지원금을 찾지 못했습니다
                    </h3>
                    <p className="text-text-muted mb-6">
                        입력하신 조건을 다시 확인해보시거나, 더 많은 지원금 정보는 블로그를 참고해주세요.
                    </p>
                    <button onClick={onReset} className="btn-primary">
                        다시 검색하기
                    </button>
                </div>
            )}

            {/* 자금관리 참고 섹션 */}
            {totalCount > 0 && (
                <section className="mt-8">
                    <div className="card p-6 md:p-8 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span>💳</span>
                            지원금 수령 후 자금관리 체크 포인트
                        </h3>
                        <p className="text-text-muted mb-6">
                            지원금은 소비로 소진되기 쉬워서, 목적별로 분리 관리하면 실제 체감 효과가 높아집니다.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-xl p-4 border border-amber-200">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                                        적금
                                    </div>
                                    <div>
                                        <h4 className="font-bold">목표 저축 통장</h4>
                                        <p className="text-xs text-text-muted">월 목표 기반 분리 관리</p>
                                    </div>
                                </div>
                                <p className="text-sm text-text-muted">
                                    월세·비상금과 분리해 지원금 사용 목적을 고정하면 누수를 줄일 수 있습니다.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-4 border border-amber-200">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                                        CMA
                                    </div>
                                    <div>
                                        <h4 className="font-bold">생활비 버퍼 통장</h4>
                                        <p className="text-xs text-text-muted">긴급 지출 대비</p>
                                    </div>
                                </div>
                                <p className="text-sm text-text-muted">
                                    고정지출 1~2개월분을 별도로 보관하면 중도해지 위험을 낮출 수 있습니다.
                                </p>
                            </div>
                        </div>


                    </div>
                </section>
            )}

            {/* 관련 글 */}
            <section className="mt-8">
                <h3 className="text-xl font-bold mb-4">📚 관련 가이드</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <Link href="/blog/youth-subsidy-guide-2026" className="card p-4 hover:shadow-md transition-shadow">
                        <h4 className="font-semibold mb-1">2026년 청년 지원금 총정리</h4>
                        <p className="text-sm text-text-muted">놓치면 안 되는 지원금 완벽 가이드</p>
                    </Link>
                    <Link href="/blog/youth-subsidy-application-rejection-reasons-2026" className="card p-4 hover:shadow-md transition-shadow">
                        <h4 className="font-semibold mb-1">지원금 심사에서 자주 탈락하는 이유</h4>
                        <p className="text-sm text-text-muted">보완 요청을 줄이는 실전 체크리스트</p>
                    </Link>
                </div>
            </section>
        </div>
    );
}
